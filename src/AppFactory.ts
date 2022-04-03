import {DataSource} from 'typeorm';
import express, {Application} from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import UserRoutes from './Users/Infrastructure/EntryPoint/Http/UserRoutes';
import ErrorHandler from './Shared/Infrastructure/Error/ErrorHandler';

export class AppFactory {
    static create(appDataSource: DataSource): Application {
        const app = express();
        app.set('db', appDataSource);
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

        UserRoutes.registerRoutes(app);

        app.use(ErrorHandler.handle);

        return app;
    }
}
