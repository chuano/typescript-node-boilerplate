import {Request, Response} from 'express';
import {AppService} from '../../../../Shared/Domain/AppService';

@AppService()
export default class PublicRouteController {
    async execute(req: Request, res: Response): Promise<void> {
        res.status(200).json({ok: 'ok'});
    }
}