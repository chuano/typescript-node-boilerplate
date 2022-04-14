import CustomError from '../../Domain/Error/CustomError';
import {HttpStatus} from '../../Domain/HttpStatus';

export default class Unauthorized extends CustomError {
    constructor() {
        super('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
}