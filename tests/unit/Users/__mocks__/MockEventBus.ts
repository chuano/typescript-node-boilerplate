import {IEventBus} from '../../../../src/Shared/Domain/EventBus/IEventBus';
import {IHandler} from '../../../../src/Shared/Domain/EventBus/IHandler';
import {IEvent} from '../../../../src/Shared/Domain/EventBus/IEvent';

export default class MockEventBus implements IEventBus {
    events: IEvent[] = [];

    attach(handler: IHandler): void {
    }

    async publish(event: IEvent): Promise<void> {
        this.events.push(event);
    }
}