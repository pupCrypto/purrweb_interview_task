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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import Auth from 'src/auth/auth';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';

import { CommentDto } from './comment.dto';
import CommentService from './comment.service';
import { CommentSwagger } from 'src/swagger/comment.swagger';

@ApiBearerAuth()
@ApiTags('comments')
@Controller()
export default class CommentController {
  constructor(private readonly service: CommentService) {}

  @ApiOperation({ summary: 'Create comment' })
  @CommentSwagger.createComment_201_response()
  @CommentSwagger.createComment_400_response()
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

  @ApiOperation({ summary: 'Delete comment' })
  @CommentSwagger.deleteComment_200_response()
  @CommentSwagger.deleteComment_403_response()
  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards/:cardId/comments/:comId')
  async deleteComment(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('comId', ParseIntPipe) comId: number,
  ) {
    return await this.service.deleteComment(auth.user.id, colId, cardId, comId);
  }

  @ApiOperation({ summary: 'Delete comments' })
  @CommentSwagger.deleteComments_200_response()
  @CommentSwagger.deleteComments_403_response()
  @UseGuards(AuthGuard)
  @Delete('/users/columns/:colId/cards/:cardId/comments')
  async deleteComments(
    @AuthParam() auth: Auth,
    @Param('colId', ParseIntPipe) colId: number,
    @Param('cardId', ParseIntPipe) cardId: number,
  ) {
    return await this.service.deleteComments(auth.user.id, colId, cardId);
  }

  @ApiOperation({ summary: 'Get comment' })
  @CommentSwagger.getComment_200_response()
  @CommentSwagger.getComment_403_response()
  @CommentSwagger.getComment_404_response()
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

  @ApiOperation({ summary: 'Get comments' })
  @CommentSwagger.getComments_200_response()
  @CommentSwagger.getComments_403_response()
  @UseGuards(AuthGuard)
  @Get('/users/columns/:colId/cards/:cardId/comments')
  async getComments(
    @AuthParam() auth: Auth,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('colId', ParseIntPipe) colId: number,
  ) {
    return await this.service.getComments(auth.user.id, colId, cardId);
  }

  @ApiOperation({ summary: 'Update comment content' })
  @CommentSwagger.updateComment_200_response()
  @CommentSwagger.updateComment_403_response()
  @UseGuards(AuthGuard)
  @Put('/users/columns/:colId/cards/:cardId/comments/:comId')
  async updateComment(
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
