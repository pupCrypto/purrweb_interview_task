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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import Auth from 'src/auth/auth';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';

import { ColumnDto } from './column.dto';
import ColumnService from './column.service';
import { ColumnSwagger } from 'src/swagger/column.swagger';

@ApiBearerAuth()
@ApiTags('columns')
@Controller()
export default class ColumnController {
  constructor(private readonly service: ColumnService) {}

  @ApiOperation({ summary: 'Create column' })
  @ColumnSwagger.createColumn_201_response()
  @ColumnSwagger.createColumn_400_response()
  @UseGuards(AuthGuard)
  @Post('/users/columns')
  async createColumn(@AuthParam() auth: Auth, @Body() dto: ColumnDto) {
    return await this.service.createColumn(auth.user.id, dto.name);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ColumnSwagger.deleteColumn_200_response()
  @ColumnSwagger.deleteColumn_403_response()
  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId')
  async deleteColumn(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.deleteColumn(auth.user.id, colId);
  }

  @ApiOperation({ summary: 'Delete columns' })
  @ColumnSwagger.deleteColumns_200_response()
  @ColumnSwagger.deleteColumns_403_response()
  @UseGuards(AuthGuard)
  @Delete('/users/columns')
  async deleteColumns(@AuthParam() auth: Auth) {
    return await this.service.deleteColumns(auth.user.id);
  }

  @ApiOperation({ summary: 'Get column' })
  @ColumnSwagger.getColumn_200_response()
  @ColumnSwagger.getColumn_403_response()
  @ColumnSwagger.getColumn_404_response()
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

  @ApiOperation({ summary: 'Get columns' })
  @ColumnSwagger.getColumns_200_response()
  @ColumnSwagger.getColumns_403_response()
  @UseGuards(AuthGuard)
  @Get('/users/columns')
  async getColumns(
    @AuthParam() auth: Auth,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getColumns(auth.user.id, addRelation);
  }

  @ApiOperation({ summary: 'Update column name' })
  @ColumnSwagger.updateColumn_200_response()
  @ColumnSwagger.updateColumn_403_response()
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
