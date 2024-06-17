import { HttpException, HttpStatus } from '@nestjs/common';
import MSG from 'src/resp/msg';

export class CommentNotFound extends HttpException {
  constructor() {
    super(MSG.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateCommentError extends HttpException {
  constructor() {
    super(MSG.DUPLICATE_COMMENT, HttpStatus.BAD_REQUEST);
  }
}
