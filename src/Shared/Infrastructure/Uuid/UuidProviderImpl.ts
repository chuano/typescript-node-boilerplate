import UuidProvider from '../../Domain/Uuid/UuidProvider';
import {randomUUID} from 'node:crypto';

export default class UuidProviderImpl implements UuidProvider {
    random(): string {
        return randomUUID();
    }
}