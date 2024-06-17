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

import { CardDto } from './card.dto';
import CardService from './card.service';

@Controller()
export default class CardController {
  constructor(private readonly service: CardService) {}

  @UseGuards(AuthGuard)
  @Post('/users/:userId/columns/:colId/cards')
  async createCard(
    @AuthParam() auth: Auth,
    @Body() dto: CardDto,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.createCard(userId, colId, dto.name);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/columns/:colId/cards/:cardId')
  async getCard(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.getCard(userId, colId, cardId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/columns/:colId/cards')
  async getCards(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.getCards(userId, colId);
  }

  @UseGuards(AuthGuard)
  @Put('/users/:userId/columns/:colId/cards/:cardId')
  async updateCard(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CardDto,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.updateCard(userId, colId, cardId, dto.name);
  }
}
