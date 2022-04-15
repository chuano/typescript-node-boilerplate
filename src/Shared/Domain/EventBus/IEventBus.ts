import {IEvent} from './IEvent';
import {IHandler} from './IHandler';

export interface IEventBus {
    attach(handler: IHandler): void;

    publish(event: IEvent): Promise<void>;
}