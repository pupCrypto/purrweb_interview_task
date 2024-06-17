const jwt = require('jsonwebtoken');
import CONFIG from 'src/config';
import { getNowTimestamp } from './general';

function hasIat(payload: object): boolean {
  return payload.hasOwnProperty('iat');
}

function hasExp(payload: object): boolean {
  return payload.hasOwnProperty('exp');
}

export function genJwtToken(payload: object | any): string {
  if (!hasIat(payload)) {
    payload.iat = getNowTimestamp();
  }
  if (!hasExp(payload)) {
    payload.exp = getNowTimestamp() + CONFIG.ACCESS_TOKEN_LIFETIME_SECS;
  }
  return jwt.sign(payload, CONFIG.SECRET_KEY, { algorithm: 'HS256' });
}

export function decodeJwtToken(token: string): any {
  return jwt.verify(token, CONFIG.SECRET_KEY);
}
