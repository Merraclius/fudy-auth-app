import { Injectable } from '@nestjs/common';
import * as lodashGet from 'lodash.get';

@Injectable()
export class ConfigurationService {
  private readonly config = {
    env: process.env.NODE_ENV || 'development',
    port: +process.env.PORT || 3000,
    db: {
      host: process.env.DB_HOST || 'db',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'password',
      name: process.env.DB_NAME || 'postgres',
    },
    logger: {
      level: process.env.LOGGER_LEVEL || 'debug',
    },
  };

  public get(path: string, defaultValue?: any): any {
    const value = lodashGet(this.config, path);

    return value !== undefined ? value : defaultValue;
  }
}
