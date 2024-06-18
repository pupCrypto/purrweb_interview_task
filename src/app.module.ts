import { Module } from '@nestjs/common';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
