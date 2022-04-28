import LostEventId from './LostEventId';

export default class LostEvent {
    constructor(readonly id: LostEventId, readonly name: string, readonly date: Date, readonly payload: unknown) {
    }
}