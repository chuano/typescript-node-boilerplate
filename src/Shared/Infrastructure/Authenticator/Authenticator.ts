import {NextFunction, Request, Response} from 'express';
import jsonwebtoken from 'jsonwebtoken';
import {TokenNotFound} from './TokenNotFound';
import Unauthorized from './Unauthorized';

export default class Authenticator {
    private static secret: string;

    constructor(secret: string) {
        Authenticator.secret = secret;
    }

    authenticate(req: Request, res: Response, next: NextFunction): void {
        const token = Authenticator.getToken(req);

        try {
            const {userId} = jsonwebtoken.verify(token, Authenticator.secret) as any;
            req.app.set('userId', userId);
        } catch (e) {
            throw new Unauthorized();
        }

        next();
    }

    private static getToken(req: Request): string {
        const token = req.headers.authorization?.split(' ')[1] || req.query.token?.toString();

        if (!token) {
            throw new TokenNotFound();
        }

        return token as string;
    }
}