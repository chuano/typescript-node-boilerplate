import UserId from '../../Shared/Domain/Users/UserId';
import UserName from './UserName';

export default class User {
    constructor(readonly id: UserId, readonly name: UserName) {
    }
}
