import { DataSource } from 'typeorm';
import IUserRepository from '../../Domain/IUserRepository';
import User from '../../Domain/User';
import UserId from '../../Domain/UserId';
import { UserSchema } from './UserSchema';

export default class UserRepository implements IUserRepository {
    private readonly repository: any;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository<User>(UserSchema);
    }

    async find(userId: UserId): Promise<User | undefined> {
        return await this.repository.findOneBy({ id: userId });
    }

    async findAll(): Promise<User[]> {
        return await this.repository.findBy({});
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }
}