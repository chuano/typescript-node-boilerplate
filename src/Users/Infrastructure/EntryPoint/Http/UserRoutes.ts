import { Application, Router } from 'express';
import GetAllUsersController from './GetAllUsersController';
import GetUserController from './GetUserController';

export default class UserRoutes {
    static registerRoutes(app: Application) {
        const router = Router();

        router.get('/', GetAllUsersController.execute);
        router.get('/:userId', GetUserController.execute);

        app.use(router);
    }
}
