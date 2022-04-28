import {ContainerBuilder} from 'diod';
import IUserRepository from '../Domain/IUserRepository';
import TypeOrmUserRepository from './Persistence/TypeOrmUserRepository';
import UserFinder from '../Domain/UserFinder/UserFinder';
import GetAllUsersHandler from '../Application/UseCases/GetAllUsers/GetAllUsersHandler';
import GetAllUsersController from './EntryPoint/Http/GetAllUsersController';
import GetUserHandler from '../Application/UseCases/GetUser/GetUserHandler';
import GetUserController from './EntryPoint/Http/GetUserController';
import HandleUserFound from './EntryPoint/Subscriber/HandleUserFound';

export default class Dependencies {
    build(builder: ContainerBuilder): void {
        builder.register(IUserRepository).use(TypeOrmUserRepository);
        builder.registerAndUse(UserFinder);
        builder.registerAndUse(GetAllUsersHandler);
        builder.registerAndUse(GetAllUsersController);
        builder.registerAndUse(GetUserHandler);
        builder.registerAndUse(GetUserController);
        builder.registerAndUse(HandleUserFound).addTag('EventHandler');
    }
}