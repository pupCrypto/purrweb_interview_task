import { Module } from '@nestjs/common';
import ColumnController from './column.controller';
import ColumnService from './column.service';

@Module({
  imports: [],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export default class ColumnModule {}
