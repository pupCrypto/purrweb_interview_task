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

import { CardDto } from './card.dto';
import CardService from './card.service';
import { CardSwagger } from 'src/swagger/card.swagger';

@ApiBearerAuth()
@ApiTags('cards')
@Controller()
export default class CardController {
  constructor(private readonly service: CardService) {}

  @ApiOperation({ summary: 'Create card' })
  @CardSwagger.createCard_201_response()
  @CardSwagger.createCard_400_response()
  @UseGuards(AuthGuard)
  @Post('/users/columns/:colId/cards')
  async createCard(
    @AuthParam() auth: Auth,
    @Body() dto: CardDto,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.createCard(auth.user.id, colId, dto.name);
  }

  @ApiOperation({ summary: 'Delete current card' })
  @CardSwagger.deleteCard_200_response()
  @CardSwagger.deleteCard_403_response()
  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards/:cardId')
  async deleteCard(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return await this.service.deleteCard(auth.user.id, colId, cardId);
  }

  @ApiOperation({ summary: 'Delete all cards' })
  @CardSwagger.deleteCards_200_response()
  @CardSwagger.deleteCards_403_response()
  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards')
  async deleteCards(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.deleteCards(auth.user.id, colId);
  }

  @ApiOperation({ summary: 'Get card' })
  @CardSwagger.getCard_200_response()
  @CardSwagger.getCard_403_response()
  @CardSwagger.getCard_404_response()
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

  @ApiOperation({ summary: 'Get all cards' })
  @CardSwagger.getCards_200_response()
  @CardSwagger.getCards_403_response()
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

  @ApiOperation({ summary: 'Update card name' })
  @CardSwagger.updateCard_200_response()
  @CardSwagger.updateCard_403_response()
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
