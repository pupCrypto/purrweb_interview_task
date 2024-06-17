import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { initConnection } from './db/con';
import CardModule from './services/card/card.module';
import ColumnModule from './services/column/column.module';
import CommentModule from './services/comment/comment.module';
import UserModule from './services/user/user.module';

@Module({
  imports: [
    CardModule,
    ColumnModule,
    CommentModule,
    UserModule,
    initConnection(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
