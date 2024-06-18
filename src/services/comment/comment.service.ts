import { Injectable } from '@nestjs/common';
import { DbColumnService, DbCommentService } from 'src/db/services';
import { CommentBelonger } from 'src/belonger';
import MSG from 'src/resp/msg';
import STATUS from 'src/resp/status';
import { DbCardService } from 'src/db/services';
import { CommentNotFound, DuplicateCommentError } from './comment.errors';
import { IntentionalInternalServerError } from 'src/errors';
import { isNull } from 'src/utils/utils';

@Injectable()
export default class CommentService extends CommentBelonger {
  constructor(
    protected readonly cardsMan: DbCardService,
    protected readonly commentsMan: DbCommentService,
    protected readonly columnsMan: DbColumnService,
  ) {
    super();
  }

  async createComment(
    userId: number,
    colId: number,
    cardId: number,
    content: string,
  ) {
    await this.checkCardBelongsToUser(userId, colId, cardId);
    try {
      const comment = await this.commentsMan.createComment(cardId, content);
      return { status: STATUS.OK, id: comment.id, msg: MSG.COMMENT_CREATED };
    } catch (e) {
      switch (e.code) {
        case '23505': {
          throw new DuplicateCommentError();
        }
        default: {
          throw new IntentionalInternalServerError();
        }
      }
    }
  }

  async deleteComment(
    userId: number,
    colId: number,
    cardId: number,
    comId: number,
  ) {
    await this.checkCommentBelongsToUser(userId, colId, cardId, comId);
    await this.commentsMan.deleteComment(cardId, comId);
    return { status: STATUS.OK, msg: MSG.COMMENT_DELETED };
  }

  async deleteComments(userId: number, colId: number, cardId: number) {
    await this.checkCardBelongsToUser(userId, colId, cardId);
    await this.commentsMan.deleteComments(cardId);
    return { status: STATUS.OK, msg: MSG.COMMENTS_DELETED };
  }

  async getComment(
    userId: number,
    colId: number,
    cardId: number,
    comId: number,
  ) {
    const comment = await this.commentsMan.getComment(
      userId,
      colId,
      cardId,
      comId,
    );
    if (isNull(comment)) {
      throw new CommentNotFound();
    }
    return { status: STATUS.OK, ...comment };
  }

  async getComments(userId: number, colId: number, cardId: number) {
    const comments = await this.commentsMan.getComments(userId, colId, cardId);
    return { status: STATUS.OK, comments };
  }

  async updateComment(
    userId: number,
    colId: number,
    cardId: number,
    comId: number,
    name: string,
  ) {
    await this.checkCommentBelongsToUser(userId, colId, cardId, comId);
    await this.commentsMan.updateComment(comId, name);
    return { status: STATUS.OK, msg: MSG.COMMENT_UPDATED };
  }
}
