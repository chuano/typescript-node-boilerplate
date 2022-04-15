import IUserRepository from '../../../../src/Users/Domain/IUserRepository';
import UserId from '../../../../src/Shared/Domain/Users/UserId';
import User from '../../../../src/Users/Domain/User';

export default class MockUserRepository implements IUserRepository {
    private user?: User;
    private users: User[] = [];

    setUser(user: User | undefined): void {
        this.user = user;
    }

    async find(userId: UserId): Promise<User | undefined> {
        return this.user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async save(user: User): Promise<void> {
    }
}
