import {IEvent} from './IEvent';
import {IHandler} from './IHandler';

export abstract class IEventBus {
    abstract attach(handler: IHandler): void;

    abstract publish(event: IEvent): Promise<void>;
}