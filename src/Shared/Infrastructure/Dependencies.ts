import {ContainerBuilder} from 'diod';
import {ILostEventRepository} from '../Domain/LostEvent/ILostEventRepository';
import TypeOrmLostEventRepository from './LostEvent/Persistence/TypeOrmLostEventRepository';

export default class Dependencies {
    build(builder: ContainerBuilder): void {
        builder.register(ILostEventRepository).use(TypeOrmLostEventRepository);
    }
}