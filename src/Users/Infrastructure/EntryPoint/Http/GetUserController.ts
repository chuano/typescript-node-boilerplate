import { NextFunction, Request, Response } from 'express';
import GetUserHandler from '../../../Application/UseCases/GetUser/GetUserHandler';
import GetUserQuery from '../../../Application/UseCases/GetUser/GetUserQuery';
import {ContainerBuilder} from 'node-dependency-injection';

export default class GetUserController {
    static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        const handler = (req.app.get('container') as ContainerBuilder).get<GetUserHandler>('Users.GetUserHandler');
        const query = new GetUserQuery(req.params.userId);
        const result = await handler.handle(query);

        res.json(result);
    }
}
