export interface IEvent {
    readonly id: string;
    readonly payload: unknown;
    readonly date: Date;
}