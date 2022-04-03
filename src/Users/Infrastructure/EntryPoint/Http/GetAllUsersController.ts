import { NextFunction, Request, Response } from 'express';
import GetAllUsersHandler from '../../../Application/UseCases/GetAllUsers/GetAllUsersHandler';
import UserRepository from '../../Persistence/TypeORMUserRepostiory';

export default class GetAllUsersController {
    static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userRepository = new UserRepository(req.app.get('db'));
        const handler = new GetAllUsersHandler(userRepository);

        const result = await handler.handle();

        res.json(result);
    }
}