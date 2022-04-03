import IUserRepository from '../IUserRepository';
import User from '../User';
import UserId from '../../../Shared/Domain/Users/UserId';
import UserNotFound from './UserNotFound';

export default class UserFinder {
    constructor(private readonly userRepository: IUserRepository) { }

    async find(userId: UserId): Promise<User> {
        const user = await this.userRepository.find(userId);

        if (!user) {
            throw new UserNotFound();
        }

        return user;
    }
}