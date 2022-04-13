import {faker} from '@faker-js/faker';
import UserName from '../../../../src/Users/Domain/UserName';

export class UserNameMother {
    static random(): UserName {
        return new UserName(faker.name.firstName());
    }
}
