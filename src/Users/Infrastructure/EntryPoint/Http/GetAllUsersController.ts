import {Request, Response} from 'express';
import GetAllUsersHandler from '../../../Application/UseCases/GetAllUsers/GetAllUsersHandler';
import {AppService} from '../../../../Shared/Domain/AppService';

@AppService()
export default class GetAllUsersController {
    constructor(private handler: GetAllUsersHandler) {
    }

    async execute(req: Request, res: Response): Promise<void> {
        const result = await this.handler.handle();
        res.json(result);
    }
}
