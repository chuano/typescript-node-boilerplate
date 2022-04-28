import LostEvent from './LostEvent';

export interface ILostEventRepository {
    save(lostEvent: LostEvent): Promise<void>;
}