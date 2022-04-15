import {UserFound} from '../../../Domain/UserFinder/Event/UserFound';
import {IHandler} from '../../../../Shared/Domain/EventBus/IHandler';

export default class HandleUserFound implements IHandler {
    readonly eventClassName: string = UserFound.name;

    async handle(event: UserFound): Promise<void> {
        console.log(event.payload);
    }
}