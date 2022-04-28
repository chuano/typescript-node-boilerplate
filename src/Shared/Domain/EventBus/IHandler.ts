import {IEvent} from './IEvent';

export interface IHandler {
    eventClassName(): string;

    handle(event: IEvent): Promise<void>;
}