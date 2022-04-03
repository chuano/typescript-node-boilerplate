import CustomError from '../../../Shared/Domain/Error/CustomError';

export default class UserNotFound extends CustomError {
    constructor() {
        super('User not found', 404);
    }
}