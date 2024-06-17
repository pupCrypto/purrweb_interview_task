import { HttpException, HttpStatus } from '@nestjs/common';
import MSG from 'src/resp/msg';

export class CardNotFound extends HttpException {
  constructor() {
    super(MSG.CARD_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateCardNameError extends HttpException {
  constructor() {
    super(MSG.CARD_NAME_CANNOT_DUPLICATE, HttpStatus.BAD_REQUEST);
  }
}
