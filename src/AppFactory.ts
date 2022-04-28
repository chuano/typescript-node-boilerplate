import {DataSource} from 'typeorm';
import express, {Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import client from 'amqplib';
import ErrorHandler from './Shared/Infrastructure/Error/ErrorHandler';
import {ContainerBuilder, YamlFileLoader} from 'node-dependency-injection';
import {glob} from 'glob';
import {EventBus} from './Shared/Infrastructure/EventBus/EventBus';
import {ILostEventRepository} from './Shared/Domain/LostEvent/ILostEventRepository';

export const AppFactory = {
    async create(appDataSource: DataSource): Promise<Application> {
        const app = express();

        const connection = await client.connect('amqp://rabbitmquser:rabbitmqpassword@localhost:5672');
        const channel = await connection.createChannel();
        await channel.assertQueue('async');

        const container = new ContainerBuilder(true, path.join(__dirname));
        const loader = new YamlFileLoader(container);
        loader.load('./dependency-injection.yml');

        // Inject instances to container
        container.set('Database', appDataSource);
        container.set('EventBus', new EventBus(
            channel,
            container.get<ILostEventRepository>('Shared.LostEventRepository'))
        );

        // Save container
        app.set('container', container);

        // Attach event handlers to event bus
        for (const [id] of container.findTaggedServiceIds('EventHandler')) {
            container.get<EventBus>('EventBus').attach(container.get(id as string));
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
