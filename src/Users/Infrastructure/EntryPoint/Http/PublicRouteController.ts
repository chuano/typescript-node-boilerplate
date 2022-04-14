import {Request, Response} from 'express';

export default class PublicRouteController {
    static async execute(req: Request, res: Response): Promise<void> {
        res.status(200).json({ok: 'ok'});
    }
}