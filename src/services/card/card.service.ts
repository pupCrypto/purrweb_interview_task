import { Injectable } from '@nestjs/common';
import { DbColumnService } from 'src/db/services';
import { CardBelonger } from 'src/belonger';
import MSG from 'src/resp/msg';
import STATUS from 'src/resp/status';
import { DbCardService } from 'src/db/services';
import { CardNotFound, DuplicateCardNameError } from './card.errors';
import { IntentionalInternalServerError } from 'src/errors';
import { isNull } from 'src/utils/utils';

@Injectable()
export default class CardService extends CardBelonger {
  constructor(
    protected readonly columnsMan: DbColumnService,
    protected readonly cardsMan: DbCardService,
  ) {
    super();
  }

  async createCard(userId: number, colId: number, name: string) {
    await this.checkColumnBelongsToUser(userId, colId);
    try {
      const card = await this.cardsMan.createCard(colId, name);
      return { status: STATUS.OK, id: card.id, msg: MSG.CARD_CREATED };
    } catch (e) {
      switch (e.code) {
        case '23505': {
          throw new DuplicateCardNameError();
        }
        default: {
          throw new IntentionalInternalServerError();
        }
      }
    }
  }

  async getCard(userId: number, colId: number, cardId: number) {
    const card = await this.cardsMan.getCard(userId, colId, cardId);
    if (isNull(card)) {
      throw new CardNotFound();
    }
    return { status: STATUS.OK, ...card };
  }

  async getCards(userId: number, colId: number) {
    const cards = await this.cardsMan.getCards(userId, colId);
    return { status: STATUS.OK, cards: cards };
  }

  async updateCard(
    userId: number,
    colId: number,
    cardId: number,
    name: string,
  ) {
    await this.checkCardBelongsToUser(userId, colId, cardId);
    await this.cardsMan.updateCard(cardId, name);
    return { status: STATUS.OK, msg: MSG.CARD_UPDATED };
  }
}
