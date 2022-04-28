import LostEvent from './LostEvent';

export abstract class ILostEventRepository {
    abstract save(lostEvent: LostEvent): Promise<void>;
}