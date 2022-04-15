import {Application} from 'express';
import {DataSource} from 'typeorm';
import {AppFactory} from '../../src/AppFactory';
import {DataSourceFactory} from '../../src/DataSourceFactory';
import Environment from '../../src/Environment';

export class End2EndHelper {
    public static appInstance: Application;
    public static dataSource: DataSource;

    public static async getApp(): Promise<Application> {
        if (this.appInstance) {
            return this.appInstance;
        }

        Environment.initialize();
        this.dataSource = DataSourceFactory.getDataSource('test');
        await this.dataSource.initialize();

        this.appInstance = await AppFactory.create(this.dataSource);

        return this.appInstance;
    }
}
