import {DataSource, Repository} from 'typeorm';
import IUserRepository from '../../Domain/IUserRepository';
import User from '../../Domain/User';
import UserId from '../../../Shared/Domain/Users/UserId';
import {UserSchema} from './UserSchema';

export default class TypeOrmUserRepository implements IUserRepository {
    private readonly repository: Repository<User>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository<User>(UserSchema);
    }

    async find(userId: UserId): Promise<User | undefined> {
        return await this.repository.findOneBy({id: userId}) ?? undefined;
    }

    async findAll(): Promise<User[]> {
        return await this.repository.findBy({});
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }
}
