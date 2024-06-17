import { Controller, Get, Post, Put } from '@nestjs/common';
import ColumnService from './column.service';

@Controller()
export default class ColumnController {
  constructor(private readonly columnServicer: ColumnService) {}

  @Get('/columns')
  async getColumn() {
    return 'column';
  }

  @Post('/columns')
  async createColumn() {
    return 'column created';
  }

  @Put('/columns')
  async editColumn() {
    return 'edit col';
  }
}
