import supertest from 'supertest';
import {Application} from 'express';
import {End2EndHelper} from '../../helpers/End2EndHelper';
import {UserSchema} from '../../../src/Users/Infrastructure/Persistence/UserSchema';
import User from '../../../src/Users/Domain/User';
import {UserMother} from '../../unit/Users/Domain/UserMother';
import UserDTO from '../../../src/Users/Application/UserDTO';

describe('Get all users', () => {
    const users = [UserMother.random(), UserMother.random()];
    let app: Application;

    beforeAll(async () => {
        app = await End2EndHelper.getApp();

        const datasource = End2EndHelper.dataSource;
        const repository = datasource.getRepository<User>(UserSchema);
        for (const user of users) {
            await repository.save(user);
        }
    });

    afterAll(async () => {
        const datasource = End2EndHelper.dataSource;
        const repository = datasource.getRepository<User>(UserSchema);
        const all = await repository.findBy({});
        for (const user of all) {
            await repository.remove(user);
        }
    });

    it('should get all users', async () => {
        const response = await supertest(app).get('/');
        expect(response.body).toEqual(users.map((user) => UserDTO.fromEntity(user)));
    });
});
