import { Application, Router } from 'express';
import GetAllUsersController from './GetAllUsersController';
import GetUserController from './GetUserController';
import Authenticator from '../../../../Shared/Infrastructure/Authenticator/Authenticator';
import PublicRouteController from './PublicRouteController';
import Environment from '../../../../Environment';

export default class UserRoutes {
    registerRoutes(app: Application) {
        const router = Router();
        const authenticator = new Authenticator(Environment.getAppSecret());

        router.get('/', PublicRouteController.execute);
        router.get('/users', authenticator.authenticate, GetAllUsersController.execute);
        router.get('/users/:userId', authenticator.authenticate, GetUserController.execute);

        app.use(router);
    }
}
