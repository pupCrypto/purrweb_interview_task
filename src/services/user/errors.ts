import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailsMustDifferError extends HttpException {
  constructor() {
    super('Почты должны отличаться', HttpStatus.BAD_REQUEST);
  }
}

export class UserAlreadyExists extends Error {}
export class UserNotFound extends Error {}
