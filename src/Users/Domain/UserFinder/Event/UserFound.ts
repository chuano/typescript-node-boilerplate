import {IEvent} from '../../../../Shared/Domain/EventBus/IEvent';
import UserFoundPayload from './UserFoundPayload';

export class UserFound implements IEvent {
    constructor(readonly payload: UserFoundPayload) {
    }
}