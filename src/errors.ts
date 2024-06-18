import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDenied extends HttpException {
  constructor() {
    super('Access Denied', HttpStatus.FORBIDDEN);
  }
}

export class BearerTokenNotProvided extends HttpException {
  constructor() {
    super('You must provide Authorization header', HttpStatus.BAD_REQUEST);
  }
}

export class BadRequest extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class IntentionalInternalServerError extends Error {}
