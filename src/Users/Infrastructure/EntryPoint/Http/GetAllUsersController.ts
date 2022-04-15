import {Request, Response} from 'express';
import GetAllUsersHandler from '../../../Application/UseCases/GetAllUsers/GetAllUsersHandler';
import {ContainerBuilder} from 'node-dependency-injection';

export default class GetAllUsersController {
    static async execute(req: Request, res: Response): Promise<void> {
        const container = req.app.get('container') as ContainerBuilder;
        const handler = container.get<GetAllUsersHandler>('Users.GetAllUsersHandler');
        const result = await handler.handle();

        res.json(result);
    }
}
