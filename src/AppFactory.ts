import {DataSource} from 'typeorm';
import express, {Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ErrorHandler from './Shared/Infrastructure/Error/ErrorHandler';
import {ContainerBuilder, YamlFileLoader} from 'node-dependency-injection';
import path from 'path';
import {glob} from 'glob';
import {EventBus} from './Shared/Infrastructure/EventBus/EventBus';

export class AppFactory {
    static create(appDataSource: DataSource): Application {
        const app = express();

        const container = new ContainerBuilder(true, path.join(__dirname));
        const loader = new YamlFileLoader(container);
        loader.load('./dependency-injection.yml');

        // Inject instances to container
        container.set('Database', appDataSource);
        container.set('EventBus', new EventBus());

        // Save container
        app.set('container', container);

        // Attach event handlers to event bus
        for (const [id] of container.findTaggedServiceIds('EventHandler')) {
            container.get('EventBus').attach(container.get(id));
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

        glob.sync(__dirname + '/**/*Routes.{js,ts}')
            .forEach(async (r) => {
                const Route = await import(r);
                const instance = new Route.default();
                instance.registerRoutes(app);
            });

        app.use(ErrorHandler.handle);

        return app;
    }
}
