import UserFinder from '../../../../../src/Users/Domain/UserFinder/UserFinder';
import MockUserRepository from '../../__mocks__/MockUserRepository';
import UserNotFound from '../../../../../src/Users/Domain/UserFinder/UserNotFound';
import {UserMother} from '../UserMother';
import {UserIdMother} from '../UserIdMother';
import {EventBus} from '../../../../../src/Shared/Infrastructure/EventBus/EventBus';
import MockEventBus from '../../__mocks__/MockEventBus';

describe('UserFinder', () => {
    describe('Find a user', () => {
        it('should find a user', async () => {
            const expectedUser = UserMother.random();

            const repository = new MockUserRepository();
            repository.setUser(expectedUser);

            const userFinder = new UserFinder(repository, new EventBus());
            const user = await userFinder.find(expectedUser.id);

            expect(user).toEqual(expectedUser);
        });

        it('should throw an error if user does not exits', async () => {
            const userId = UserIdMother.random();

            const repository = new MockUserRepository();
            repository.setUser(undefined);

            const userFinder = new UserFinder(repository, new EventBus());

            await expect(userFinder.find(userId)).rejects.toThrow(UserNotFound);
        });

        it('should publish user found event if user was found', async () => {
            const expectedUser = UserMother.random();

            const eventBus = new MockEventBus();

            const repository = new MockUserRepository();
            repository.setUser(expectedUser);

            const userFinder = new UserFinder(repository, eventBus);
            await userFinder.find(expectedUser.id);

            expect(eventBus.events.length).toBe(1);
        });
    });
});
