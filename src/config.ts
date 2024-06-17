import { HOUR } from './utils/const';
import env from './utils/env';

const CONFIG = {
  HOST: env('HOST', 'localhost'),
  PORT: env('PORT', 3000),

  ACCESS_TOKEN_LIFETIME_SECS: env('ACCESS_TOKEN_LIFETIME_SECS', HOUR),
  SECRET_KEY: env('SECRET_KEY', 'SECRET_KEY'),

  DB_HOST: env('DB_HOST', 'localhost'),
  DB_PORT: env('DB_PORT', 5432),
  DB_USER: env('DB_USER', 'postgres'),
  DB_PWD: env('DB_PWD', 'postgres'),
  DB_NAME: env('DB_NAME', 'postgres1'),
};

export default CONFIG;
