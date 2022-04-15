import IUserRepository from '../IUserRepository';
import User from '../User';
import UserId from '../../../Shared/Domain/Users/UserId';
import UserNotFound from './UserNotFound';
import {IEventBus} from '../../../Shared/Domain/EventBus/IEventBus';
import {UserFound} from './Event/UserFound';
import UserFoundPayload from './Event/UserFoundPayload';

export default class UserFinder {
    constructor(private readonly userRepository: IUserRepository, private readonly eventBus: IEventBus) {
    }

    async find(userId: UserId): Promise<User> {
        const user = await this.userRepository.find(userId);

        if (!user) {
            throw new UserNotFound();
        }

        await this.eventBus.publish(new UserFound(new UserFoundPayload(userId)));

        return user;
    }
}