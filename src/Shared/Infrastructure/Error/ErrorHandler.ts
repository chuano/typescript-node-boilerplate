import { NextFunction, Request, Response } from 'express';
import CustomError from '../../Domain/Error/CustomError';

export default class ErrorHandler {
    static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        if (err instanceof CustomError) {
            res.status(err.statusCode).json({
                msg: err.message,
                code: err.statusCode,
            });
        } else {
            res.status(500).json({
                msg: err.message,
                code: 500,
            });
        }

        next();
    }
}