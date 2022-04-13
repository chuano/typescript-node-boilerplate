import {EntitySchema} from 'typeorm';
import User from '../../Domain/User';
import UserId from '../../../Shared/Domain/Users/UserId';
import UserName from '../../Domain/UserName';

export const UserSchema = new EntitySchema<User>({
    name: 'User',
    target: User,
    columns: {
        id: {
            type: String,
            primary: true,
            transformer: {
                to: (value: UserId): string => value.value,
                from: (value: string): UserId => new UserId(value),
            }
        },
        name: {
            type: String,
            transformer: {
                to: (value: UserName): string => value.value,
                from: (value: string): UserName => new UserName(value),
            }
        },
    },
});
