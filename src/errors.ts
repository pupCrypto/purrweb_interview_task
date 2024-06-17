import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDenied extends HttpException {
  constructor() {
    super('Access Denied', HttpStatus.FORBIDDEN);
  }
}

export class BadRequest extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IntentionalInternalServerError extends Error {}
