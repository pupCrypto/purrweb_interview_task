import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthService from 'src/auth/auth.service';
import { User, UserColumn } from 'src/db/models';
import { DbColumnService, DbUserService } from 'src/db/services';

import ColumnController from './column.controller';
import ColumnService from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserColumn])],
  controllers: [ColumnController],
  providers: [AuthService, ColumnService, DbColumnService, DbUserService],
})
export default class ColumnModule {}
