import User from './User';
import UserId from '../../Shared/Domain/Users/UserId';

export default abstract class IUserRepository {
    abstract find(userId: UserId): Promise<User | undefined>;

    abstract findAll(): Promise<User[]>;

    abstract save(user: User): Promise<void>;
}