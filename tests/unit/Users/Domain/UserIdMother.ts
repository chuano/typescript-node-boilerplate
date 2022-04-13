import {faker} from '@faker-js/faker';
import UserId from '../../../../src/Shared/Domain/Users/UserId';

export class UserIdMother {
    static random(): UserId {
        return new UserId(faker.datatype.uuid());
    }
}
