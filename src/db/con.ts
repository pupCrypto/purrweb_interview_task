import { TypeOrmModule } from '@nestjs/typeorm';
import CONFIG from 'src/config';
import { User, UserColumn, Card, Comment } from './models';

export function initConnection() {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: CONFIG.DB_HOST,
    port: CONFIG.DB_PORT,
    username: CONFIG.DB_USER,
    password: CONFIG.DB_PWD,
    database: CONFIG.DB_NAME,
    entities: [User, UserColumn, Card, Comment],
    synchronize: true,
  });
}
