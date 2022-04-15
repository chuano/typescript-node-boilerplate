import {IEvent} from './IEvent';

export interface IHandler {
    readonly eventClassName: string;

    handle(event: IEvent): Promise<void>;
}