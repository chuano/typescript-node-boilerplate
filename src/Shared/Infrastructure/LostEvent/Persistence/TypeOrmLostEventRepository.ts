import {ILostEventRepository} from '../../../Domain/LostEvent/ILostEventRepository';
import LostEvent from '../../../Domain/LostEvent/LostEvent';
import {DataSource, Repository} from 'typeorm';
import {LostEventSchema} from './LostEventSchema';

export default class TypeOrmLostEventRepository implements ILostEventRepository {
    private readonly repository: Repository<LostEvent>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository<LostEvent>(LostEventSchema);
    }

    async save(lostEvent: LostEvent): Promise<void> {
        await this.repository.save(lostEvent);
    }
}