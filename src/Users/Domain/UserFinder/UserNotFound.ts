import CustomError from '../../../Shared/Domain/CustomError';

export default class UserNotFound extends CustomError {
    constructor() {
        super('User not found', 404);
    }
}