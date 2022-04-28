import IUuidProvider from '../../Domain/Uuid/IUuidProvider';
import {randomUUID} from 'node:crypto';

export default class UuidProviderImpl implements IUuidProvider {
    random(): string {
        return randomUUID();
    }
}