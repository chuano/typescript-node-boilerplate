import {Application, Request, Response, Router} from 'express';
import GetAllUsersController from './EntryPoint/Http/GetAllUsersController';
import GetUserController from './EntryPoint/Http/GetUserController';
import Authenticator from '../../Shared/Infrastructure/Authenticator/Authenticator';
import Environment from '../../Environment';
import PublicRouteController from './EntryPoint/Http/PublicRouteController';
import {Container} from 'diod';

export default class Routes {
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
