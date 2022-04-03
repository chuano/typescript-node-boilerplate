import { NextFunction, Request, Response } from 'express';
import GetUserHandler from '../../../Application/UseCases/GetUser/GetUserHandler';
import GetUserQuery from '../../../Application/UseCases/GetUser/GetUserQuery';
import UserFinder from '../../../Domain/UserFinder/UserFinder';
import UserRepository from '../../Persistence/TypeORMUserRepostiory';

export default class GetUserController {
    static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        const repository = new UserRepository(req.app.get('db'));
        const userFinder = new UserFinder(repository);
        const handler = new GetUserHandler(userFinder);

        const query = new GetUserQuery(req.params.userId);
        const result = await handler.handle(query);

        res.json(result);
    }
}