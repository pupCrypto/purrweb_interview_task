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

import { CardDto } from './card.dto';
import CardService from './card.service';

@Controller()
export default class CardController {
  constructor(private readonly service: CardService) {}

  @UseGuards(AuthGuard)
  @Post('/users/columns/:colId/cards')
  async createCard(
    @AuthParam() auth: Auth,
    @Body() dto: CardDto,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.createCard(auth.user.id, colId, dto.name);
  }

  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards/:cardId')
  async deleteCard(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return await this.service.deleteCard(auth.user.id, colId, cardId);
  }

  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards')
  async deleteCards(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.deleteCards(auth.user.id, colId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/columns/:colId/cards/:cardId')
  async getCard(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getCard(auth.user.id, colId, cardId, addRelation);
  }

  @UseGuards(AuthGuard)
  @Get('/users/columns/:colId/cards')
  async getCards(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getCards(auth.user.id, colId, addRelation);
  }

  @UseGuards(AuthGuard)
  @Put('/users/columns/:colId/cards/:cardId')
  async updateCard(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Body() dto: CardDto,
  ) {
    return await this.service.updateCard(auth.user.id, colId, cardId, dto.name);
  }
}
