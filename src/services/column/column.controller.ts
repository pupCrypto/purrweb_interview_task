import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import Auth from 'src/auth/auth';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';
import { strictUserValidation } from 'src/auth/misc';

import { ColumnDto } from './column.dto';
import ColumnService from './column.service';

@Controller()
export default class ColumnController {
  constructor(private readonly service: ColumnService) {}

  @UseGuards(AuthGuard)
  @Post('/users/:userId/columns')
  async createColumn(
    @AuthParam() auth: Auth,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: ColumnDto,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.createColumn(userId, dto.name);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/columns/:colId')
  async getColumn(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.getColumn(userId, colId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/columns')
  async getColumns(
    @AuthParam() auth: Auth,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.getColumns(userId);
  }

  @UseGuards(AuthGuard)
  @Put('/users/:userId/columns/:colId')
  async updateColumn(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: ColumnDto,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.updateColumn(userId, colId, dto.name);
  }
}
