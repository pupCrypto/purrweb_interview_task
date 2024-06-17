import {} from './db/services';
import {
  DbCardService,
  DbColumnService,
  DbCommentService,
} from './db/services';
import { AccessDenied } from './errors';
import { isNull } from './utils/utils';

class BaseBelonger {
  check(obj: any) {
    if (isNull(obj)) {
      throw new AccessDenied();
    }
  }
}

export class ColumnBelonger extends BaseBelonger {
  protected columnsMan: DbColumnService;

  async checkColumnBelongsToUser(userId: number, colId: number) {
    const column = await this.columnsMan.getColumn(userId, colId);
    this.check(column);
  }
}

export class CardBelonger extends ColumnBelonger {
  protected cardsMan: DbCardService;

  async checkCardBelongsToUser(userId: number, colId: number, cardId: number) {
    const card = await this.cardsMan.getCard(userId, colId, cardId);
    this.check(card);
  }
}

export class CommentBelonger extends CardBelonger {
  protected commentsMan: DbCommentService;

  async checkCommentBelongsToUser(
    userId: number,
    colId: number,
    cardId: number,
    commentId: number,
  ) {
    const comment = await this.commentsMan.getComment(
      userId,
      colId,
      cardId,
      commentId,
    );
    this.check(comment);
  }
}
