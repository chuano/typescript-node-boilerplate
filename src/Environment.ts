import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

export default class Environment {
    static initialize(): void {
        let dotenvFile;
        switch (process.env.NODE_ENV) {
            case 'prod':
                dotenvFile = path.join(__dirname, '../../.env.local');
                if (!fs.existsSync(dotenvFile)) {
                    dotenvFile = path.join(__dirname, '../../.env');
                }
                break;
            case 'test':
                dotenvFile = path.join(__dirname, '../.env.test.local');
                if (!fs.existsSync(dotenvFile)) {
                    dotenvFile = path.join(__dirname, '../.env.test');
                }
                break;
            default:
                dotenvFile = path.join(__dirname, '../../.env.dev.local');
                if (!fs.existsSync(dotenvFile)) {
                    dotenvFile = path.join(__dirname, '../.env.dev');
                }
                break;
        }
        dotenv.config({path: dotenvFile});
    }

    static getAppSecret(): string {
        if (!process.env.APP_SECRET) {
            throw new Error('Environment variable APP_SECRET not defined');
        }
        return process.env.APP_SECRET;
    }
}