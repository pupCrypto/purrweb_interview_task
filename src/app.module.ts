import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import ColumnModule from './services/column/column.module';
import UserModule from './services/user/user.module';

@Module({
  imports: [ColumnModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
