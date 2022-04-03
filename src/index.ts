require('express-async-errors');
import express from 'express';
import { DataSource } from 'typeorm';
import ErrorHandler from './Shared/Infrastructure/Error/ErrorHandler';
import UserRoutes from './Users/Infrastructure/EntryPoint/Http/UserRoutes';
import { UserSchema } from './Users/Infrastructure/Persistence/UserSchema';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: `${__dirname}/db.sqlite`,
    entities: [UserSchema],
    logging: true,
    synchronize: true,
});

(async () => {
    await AppDataSource.initialize();

    const app = express();
    app.set('db', AppDataSource);

    UserRoutes.registerRoutes(app);

    app.use(ErrorHandler.handle);

    app.listen(3000, () => console.log('Listening on port 3000'));
})();