import {IEventBus} from '../../Domain/EventBus/IEventBus';
import {IEvent} from '../../Domain/EventBus/IEvent';
import {IHandler} from '../../Domain/EventBus/IHandler';
import {Channel} from 'amqplib';
import {ILostEventRepository} from '../../Domain/LostEvent/ILostEventRepository';
import LostEvent from '../../Domain/LostEvent/LostEvent';
import LostEventId from '../../Domain/LostEvent/LostEventId';

export class EventBus implements IEventBus {
    private readonly handlers: IHandler[] = [];

    constructor(private rabbitChannel: Channel, private lostEventRepository: ILostEventRepository) {
    }

    attach(handler: IHandler): void {
        this.handlers.push(handler);
    }

    async publish(event: IEvent): Promise<void> {
        for (const handler of this.handlers) {
            if (event.constructor.name === handler.eventClassName) {
                await handler.handle(event);
            }
        }
        try {
            this.rabbitChannel.sendToQueue('async', Buffer.from(JSON.stringify(event)));
        } catch (error) {
            const lostEvent = new LostEvent(
                new LostEventId(event.id),
                event.constructor.name,
                event.date,
                event.payload,
            );
            await this.lostEventRepository.save(lostEvent);
            console.log((error as Error).message);
        }
    }
}