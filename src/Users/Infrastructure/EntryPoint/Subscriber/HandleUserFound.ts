import {UserFound} from '../../../Domain/UserFinder/Event/UserFound';
import {IHandler} from '../../../../Shared/Domain/EventBus/IHandler';
import {AppService} from '../../../../Shared/Domain/AppService';

@AppService()
export default class HandleUserFound implements IHandler {
    eventClassName(): string {
        return UserFound.name;
    }

    async handle(event: UserFound): Promise<void> {
        console.log(event.payload);
    }
}