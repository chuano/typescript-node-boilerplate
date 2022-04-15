import supertest from 'supertest';
import {Application} from 'express';
import {End2EndHelper} from '../../helpers/End2EndHelper';
import {UserSchema} from '../../../src/Users/Infrastructure/Persistence/UserSchema';
import User from '../../../src/Users/Domain/User';
import {UserMother} from '../../unit/Users/Domain/UserMother';
import UserDto from '../../../src/Users/Application/UserDto';
import jsonwebtoken from 'jsonwebtoken';
import Environment from '../../../src/Environment';

describe('Get all users', () => {
    const users = [UserMother.random(), UserMother.random()];
    let app: Application;
    let token: string;

    beforeAll(async () => {
        app = await End2EndHelper.getApp();
        token = jsonwebtoken.sign({userId: '123'}, Environment.getAppSecret());

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
        const response = await supertest(app).get(`/users?token=${token}`);
        expect(response.body).toEqual(users.map((user) => UserDto.fromEntity(user)));
    });
});
