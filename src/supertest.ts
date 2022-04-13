import supertest from 'supertest';
import {End2EndHelper} from '../tests/helpers/End2EndHelper';

const test = async () => {
    const app = await End2EndHelper.getApp();
    const response = await supertest(app).get('/');
    console.log(response.body);
};

test();
