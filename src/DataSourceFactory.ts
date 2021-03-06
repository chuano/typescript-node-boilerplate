import {DataSource, DataSourceOptions} from 'typeorm';
import {UserSchema} from './Users/Infrastructure/Persistence/UserSchema';
import {LostEventSchema} from './Shared/Infrastructure/LostEvent/Persistence/LostEventSchema';

export class DataSourceFactory {

    private static readonly commonOptions = {
        type: 'sqlite',
        entities: [UserSchema, LostEventSchema],
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

    private static buildDataSource(options: object): DataSource {
        const mergedOptions = {
            ...DataSourceFactory.commonOptions,
            ...options
        } as DataSourceOptions;
        return new DataSource(mergedOptions);
    }
}
