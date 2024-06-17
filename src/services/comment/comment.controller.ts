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

import { CommentDto } from './comment.dto';
import CommentService from './comment.service';

@Controller()
export default class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(AuthGuard)
  @Post('/users/:userId/columns/:colId/cards/:cardId/comments')
  async createComment(
    @AuthParam() auth: Auth,
    @Body() dto: CommentDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.createComment(userId, colId, cardId, dto.content);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/columns/:colId/cards/:cardId/comments/:comId')
  async getComment(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('comId', ParseIntPipe) comId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.getComment(userId, colId, cardId, comId);
  }

  @UseGuards(AuthGuard)
  @Get('/users/:userId/columns/:colId/cards/:cardId/comments')
  async getCards(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.getComments(userId, colId, cardId);
  }

  @UseGuards(AuthGuard)
  @Put('/users/:userId/columns/:colId/cards/:cardId/comments/:comId')
  async updateCard(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('comId', ParseIntPipe) comId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CommentDto,
  ) {
    strictUserValidation(auth, userId);
    return await this.service.updateComment(
      userId,
      colId,
      cardId,
      comId,
      dto.content,
    );
  }
}
