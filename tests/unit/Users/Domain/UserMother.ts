import User from '../../../../src/Users/Domain/User';
import {UserIdMother} from './UserIdMother';
import {UserNameMother} from './UserNameMother';

export class UserMother {
    static random(): User {
        return new User(
            UserIdMother.random(),
            UserNameMother.random()
        );
    }
}
