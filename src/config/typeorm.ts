import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    let config: TypeOrmModuleOptions;

    const isDevEnv =
      process.env.APP_ENV && process.env.APP_ENV.toLowerCase() === 'dev'
        ? true
        : false;

    config = {
      type: 'mysql',
      host: process.env.DB_HOST || '',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || '',
      database: process.env.DB_NAME || '',
      password: process.env.DB_PASSWORD || '',
      logging: true,
    };

    // ? Dev Configs
    if (process.env.APP_START_DB === 'true' && isDevEnv) {
      config = {
        ...config,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      };
    }

    // ? production configs
    // ? in production we use migrations instead of using auto sync. auto sync is best for
    // ? dev only.
    if (process.env.APP_START_DB === 'true' && !isDevEnv) {
      config = {
        ...config,
        migrations: [join(__dirname, '/../migrations/*.ts')],
      };
    }

    return config;
  },
};
