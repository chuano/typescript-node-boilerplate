import {Request, Response} from 'express';
import GetUserHandler from '../../../Application/UseCases/GetUser/GetUserHandler';
import GetUserQuery from '../../../Application/UseCases/GetUser/GetUserQuery';
import {AppService} from '../../../../Shared/Domain/AppService';

@AppService()
export default class GetUserController {
    constructor(private handler: GetUserHandler) {
    }

    async execute(req: Request, res: Response): Promise<void> {
        const query = new GetUserQuery(req.params.userId);
        const result = await this.handler.handle(query);

        res.json(result);
    }
}
