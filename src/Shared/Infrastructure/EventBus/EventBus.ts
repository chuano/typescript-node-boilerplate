import {IEventBus} from '../../Domain/EventBus/IEventBus';
import {IEvent} from '../../Domain/EventBus/IEvent';
import {IHandler} from '../../Domain/EventBus/IHandler';

export class EventBus implements IEventBus {
    private readonly handlers: IHandler[] = [];

    attach(handler: IHandler): void {
        this.handlers.push(handler);
    }

    async publish(event: IEvent): Promise<void> {
        for (const handler of this.handlers) {
            if (event.constructor.name === handler.eventClassName) {
                await handler.handle(event);
            }
        }
    }
}