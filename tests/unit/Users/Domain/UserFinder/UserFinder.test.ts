import UserFinder from '../../../../../src/Users/Domain/UserFinder/UserFinder';
import MockUserRepository from '../../__mocks__/MockUserRepository';
import UserNotFound from '../../../../../src/Users/Domain/UserFinder/UserNotFound';
import {UserMother} from '../UserMother';
import {UserIdMother} from '../UserIdMother';
import MockEventBus from '../../__mocks__/MockEventBus';
import {UserFound} from '../../../../../src/Users/Domain/UserFinder/Event/UserFound';

describe('UserFinder', () => {
    describe('Find a user', () => {
        it('should find a user', async () => {
            const expectedUser = UserMother.random();

            const repository = new MockUserRepository();
            repository.setUser(expectedUser);

            const userFinder = new UserFinder(repository, new MockEventBus());
            const user = await userFinder.find(expectedUser.id);

            expect(user).toEqual(expectedUser);
        });

        it('should throw an error if user does not exits', async () => {
            const userId = UserIdMother.random();

            const repository = new MockUserRepository();

            const userFinder = new UserFinder(repository, new MockEventBus());

            await expect(async () => await userFinder.find(userId))
                .rejects
                .toThrow(UserNotFound);
        });

        it('should publish user found event if user was found', async () => {
            const expectedUser = UserMother.random();

            const eventBus = new MockEventBus();

            const repository = new MockUserRepository();
            repository.setUser(expectedUser);

            const userFinder = new UserFinder(repository, eventBus);
            await userFinder.find(expectedUser.id);

            expect(eventBus.events.length).toBe(1);
            expect(eventBus.events[0]).toBeInstanceOf(UserFound);
        });
    });
});
