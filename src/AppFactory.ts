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

export class AppFactory {
    static create(appDataSource: DataSource): Application {
        const app = express();

        const container = new ContainerBuilder(true, path.join(__dirname));
        const loader = new YamlFileLoader(container);
        container.set('Database', appDataSource);
        loader.load('./dependency-injection.yml');
        app.set('container', container);

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

        glob.sync(__dirname + '/**/*Routes.js')
            .forEach(async (r) => {
                const Route = await import(r);
                const instance = new Route.default();
                instance.registerRoutes(app);
            });

        app.use(ErrorHandler.handle);

        return app;
    }
}
