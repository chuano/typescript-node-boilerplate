import 'reflect-metadata';
import {DataSource} from 'typeorm';
import express, {Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import client from 'amqplib';
import ErrorHandler from './Shared/Infrastructure/Error/ErrorHandler';
import {glob} from 'glob';
import {InMemoryEventBus} from './Shared/Infrastructure/EventBus/InMemoryEventBus';
import {ContainerBuilder} from 'diod';
import {IEventBus} from './Shared/Domain/EventBus/IEventBus';
import TypeOrmLostEventRepository from './Shared/Infrastructure/LostEvent/Persistence/TypeOrmLostEventRepository';
import {IHandler} from './Shared/Domain/EventBus/IHandler';

export const AppFactory = {
    async create(appDataSource: DataSource): Promise<Application> {
        const app = express();

        const connection = await client.connect('amqp://rabbitmquser:rabbitmqpassword@localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertQueue('async');

        const builder = new ContainerBuilder();
        for (const dependencies of glob.sync(__dirname + '/**/Dependencies.{js,ts}')) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const Dependencies = await import(dependencies);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            const instance = new Dependencies.default();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            instance.build(builder);
        }
        builder.register(DataSource).useInstance(appDataSource);
        builder.register(IEventBus).useInstance(
            new InMemoryEventBus(
                channel,
                new TypeOrmLostEventRepository(appDataSource))
        );

        const container = builder.build();
        app.set('container', container);

        // Attach event handlers to event bus
        for (const handler of container.findTaggedServiceIdentifiers('EventHandler')) {
            container.get(IEventBus).attach(container.get(handler) as IHandler);
        }

        app.use(express.urlencoded({
            extended: true,
            limit: '5mb'
        }));
        app.use(express.json({
            limit: '50mb'
        }));
        app.use(compression());
        app.use(cors({
            origin: true,
            credentials: true
        }));
        app.use(helmet());
        app.use(morgan('dev'));

        for (const route of glob.sync(__dirname + '/**/*Routes.{js,ts}')) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const Route = await import(route);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
            const instance = new Route.default();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            instance.registerRoutes(app);
        }

        app.use(ErrorHandler.handle);

        return app;
    },
};
