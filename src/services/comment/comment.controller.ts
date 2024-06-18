import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import Auth from 'src/auth/auth';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';

import { CommentDto } from './comment.dto';
import CommentService from './comment.service';

@Controller()
export default class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(AuthGuard)
  @Post('/users/columns/:colId/cards/:cardId/comments')
  async createComment(
    @AuthParam() auth: Auth,
    @Body() dto: CommentDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.createComment(
      auth.user.id,
      colId,
      cardId,
      dto.content,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards/:cardId/comments/:comId')
  async deleteCard(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('comId', ParseIntPipe) comId: number,
  ) {
    return await this.service.deleteComment(auth.user.id, colId, cardId, comId);
  }

  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards/:cardId/comments')
  async deleteCards(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return await this.service.deleteComments(auth.user.id, colId, cardId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/columns/:colId/cards/:cardId/comments/:comId')
  async getComment(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('comId', ParseIntPipe) comId: number,
  ) {
    return await this.service.getComment(auth.user.id, colId, cardId, comId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/columns/:colId/cards/:cardId/comments')
  async getCards(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.getComments(auth.user.id, colId, cardId);
  }

  @UseGuards(AuthGuard)
  @Put('/users/columns/:colId/cards/:cardId/comments/:comId')
  async updateCard(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('comId', ParseIntPipe) comId: number,
    @Body() dto: CommentDto,
  ) {
    return await this.service.updateComment(
      auth.user.id,
      colId,
      cardId,
      comId,
      dto.content,
    );
  }
}
