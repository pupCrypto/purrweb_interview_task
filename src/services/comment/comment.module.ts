import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthService from 'src/auth/auth.service';
import { Card, Comment, User, UserColumn } from 'src/db/models';
import {
  DbCardService,
  DbColumnService,
  DbCommentService,
  DbUserService,
} from 'src/db/services';

import CommentController from './comment.controller';
import CommentService from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Comment, User, UserColumn])],
  controllers: [CommentController],
  providers: [
    AuthService,
    CommentService,
    DbCardService,
    DbColumnService,
    DbCommentService,
    DbUserService,
  ],
})
export default class CommentModule {}
