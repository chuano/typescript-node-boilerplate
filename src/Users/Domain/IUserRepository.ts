import User from './User';
import UserId from './UserId';

export default interface IUserRepository {
    find(userId: UserId): Promise<User | undefined>;

    findAll(): Promise<User[]>;

    save(user: User): Promise<void>;
}