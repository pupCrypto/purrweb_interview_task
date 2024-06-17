import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthService from 'src/auth/auth.service';
import { Card, User, UserColumn } from 'src/db/models';
import { DbCardService, DbColumnService, DbUserService } from 'src/db/services';

import CardController from './card.controller';
import CardService from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, User, UserColumn])],
  controllers: [CardController],
  providers: [
    AuthService,
    CardService,
    DbCardService,
    DbColumnService,
    DbUserService,
  ],
})
export default class CardModule {}
