require('express-async-errors');
import {DataSource} from 'typeorm';
import {UserSchema} from './Users/Infrastructure/Persistence/UserSchema';
import {AppFactory} from './AppFactory';

const appDataSource = new DataSource({
    type: 'sqlite',
    database: `${__dirname}/../db.sqlite`,
    entities: [UserSchema],
    logging: true,
    synchronize: true,
});

(async () => {
    await appDataSource.initialize();

    const app = AppFactory.create(appDataSource);

    app.listen(3002, () => console.log('Listening on port 3000'));
})();
