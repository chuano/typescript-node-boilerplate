import {Application, Request, Response, Router} from 'express';
import GetAllUsersController from './GetAllUsersController';
import GetUserController from './GetUserController';
import Authenticator from '../../../../Shared/Infrastructure/Authenticator/Authenticator';
import Environment from '../../../../Environment';
import {AppService} from '../../../../Shared/Domain/AppService';
import PublicRouteController from './PublicRouteController';
import {Container} from 'diod';

@AppService()
export default class UserRoutes {
    registerRoutes(app: Application) {
        const router = Router();
        const authenticator = new Authenticator(Environment.getAppSecret());

        const container = app.get('container') as Container;
        router.get(
            '/',
            (req: Request, res: Response) => container.get(PublicRouteController).execute(req, res)
        );
        router.get(
            '/users',
            authenticator.authenticate,
            async (req: Request, res: Response) => await container.get(GetAllUsersController).execute(req, res)
        );
        router.get(
            '/users/:userId',
            authenticator.authenticate,
            async (req: Request, res: Response) => await container.get(GetUserController).execute(req, res)
        );

        app.use(router);
    }
}
