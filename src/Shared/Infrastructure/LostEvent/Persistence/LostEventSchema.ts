import {EntitySchema} from 'typeorm';
import LostEventId from '../../../Domain/LostEvent/LostEventId';
import LostEvent from '../../../Domain/LostEvent/LostEvent';

export const LostEventSchema = new EntitySchema<LostEvent>({
    name: 'LostEvent',
    target: LostEvent,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: {
                to: (value: LostEventId): string => value.value,
                from: (value: string): LostEventId => new LostEventId(value),
            }
        },
        name: {
            type: String,
        },
        date: {
            type: Date,
        },
        payload: {
            type: String,
            transformer: {
                to: (value: object): string => JSON.stringify(value),
                from: (value: string): object => JSON.parse(value) as object,
            }
        },
    },
});
