import {DataSource} from 'typeorm';
import {UserSchema} from './Users/Infrastructure/Persistence/UserSchema';

export class DataSourceFactory {

    private static readonly commonOptions = {
        type: 'sqlite',
        entities: [UserSchema],
    };

    static getDataSource(environment: string): DataSource {
        switch (environment) {
            case 'prod':
                return DataSourceFactory.buildDataSource({
                    database: `${__dirname}/../../db.sqlite`,
                    logging: false,
                    synchronize: false,
                });
            case 'test':
                return DataSourceFactory.buildDataSource({
                    database: `${__dirname}/../tests/db.sqlite`,
                    logging: false,
                    synchronize: true,
                });
            default:
                return DataSourceFactory.buildDataSource({
                    database: `${__dirname}/../../db.sqlite`,
                    logging: true,
                    synchronize: true,
                });
        }
    }

    private static buildDataSource(options: any): DataSource {
        const mergedOptions = {
            ...DataSourceFactory.commonOptions,
            ...options
        };
        return new DataSource(mergedOptions);
    }
}
