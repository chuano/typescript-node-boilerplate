import CustomError from '../../Domain/Error/CustomError';
import {HttpStatus} from '../../Domain/HttpStatus';

export class TokenNotFound extends CustomError {
    constructor() {
        super('Token not found', HttpStatus.UNAUTHORIZED);
    }
}