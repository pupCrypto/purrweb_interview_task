import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import Auth from 'src/auth/auth';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';

import { ColumnDto } from './column.dto';
import ColumnService from './column.service';

@Controller()
export default class ColumnController {
  constructor(private readonly service: ColumnService) {}

  @UseGuards(AuthGuard)
  @Post('/users/columns')
  async createColumn(@AuthParam() auth: Auth, @Body() dto: ColumnDto) {
    return await this.service.createColumn(auth.user.id, dto.name);
  }

  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId')
  async deleteColumn(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.deleteColumn(auth.user.id, colId);
  }

  @UseGuards(AuthGuard)
  @Delete('/users/columns')
  async deleteColumns(@AuthParam() auth: Auth) {
    return await this.service.deleteColumns(auth.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/users/columns/:colId')
  async getColumn(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getColumn(auth.user.id, colId, addRelation);
  }

  @UseGuards(AuthGuard)
  @Get('/users/columns')
  async getColumns(
    @AuthParam() auth: Auth,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getColumns(auth.user.id, addRelation);
  }

  @UseGuards(AuthGuard)
  @Put('/users/:userId/columns/:colId')
  async updateColumn(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Body() dto: ColumnDto,
  ) {
    return await this.service.updateColumn(auth.user.id, colId, dto.name);
  }
}
