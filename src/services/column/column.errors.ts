import { HttpException, HttpStatus } from '@nestjs/common';
import MSG from 'src/resp/msg';

export class ColumnNotFound extends HttpException {
  constructor() {
    super(MSG.COLUMN_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
