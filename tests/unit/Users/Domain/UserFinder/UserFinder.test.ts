import UserFinder from '../../../../../src/Users/Domain/UserFinder/UserFinder';
import MockUserRepository from '../../__mocks__/MockUserRepository';
import UserNotFound from '../../../../../src/Users/Domain/UserFinder/UserNotFound';
import {UserMother} from '../UserMother';
import {UserIdMother} from '../UserIdMother';

describe('UserFinder', () => {
    describe('Find a user', () => {
        it('should find a user', async () => {
            const expectedUser = UserMother.random();

            const repository = new MockUserRepository();
            repository.setUser(expectedUser);

            const userFinder = new UserFinder(repository);
            const user = await userFinder.find(expectedUser.id);

            expect(user).toEqual(expectedUser);
        });

        it('should throw an error if user does not exits', async () => {
            const userId = UserIdMother.random();

            const repository = new MockUserRepository();
            repository.setUser(undefined);

            const userFinder = new UserFinder(repository);

            await expect(userFinder.find(userId)).rejects.toThrow(UserNotFound);
        });
    });
});
