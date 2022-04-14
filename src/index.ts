require('express-async-errors');
import {AppFactory} from './AppFactory';
import {DataSourceFactory} from './DataSourceFactory';
import Environment from './Environment';

const appDataSource = DataSourceFactory.getDataSource(process.env.NODE_ENV ?? 'dev');
(async () => {
    Environment.initialize();
    await appDataSource.initialize();

    const app = AppFactory.create(appDataSource);

    app.listen(3002, () => console.log('Listening on port 3000'));
})();
