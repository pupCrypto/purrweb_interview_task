import { decodeJwtToken } from 'src/utils/jwt';
import { isNull } from 'src/utils/utils';
import { DbUserService } from 'src/db/services';
import { Injectable } from '@nestjs/common';
import { FLAG } from './const';
import { AccessToken, IsAuthenticated } from './auth.types';
import Auth from './auth';

@Injectable()
export default class AuthService {
  constructor(private readonly userManager: DbUserService) {}

  async authenticate(
    bearerToken: AccessToken,
  ): Promise<Auth | IsAuthenticated> {
    let payload: any;
    try {
      payload = decodeJwtToken(bearerToken);
    } catch (e) {
      return FLAG.NOT_AUTHENTICATED;
    }
    const user = await this.userManager.getUser(payload.userId);
    if (isNull(user)) {
      return FLAG.NOT_AUTHENTICATED;
    }
    return new Auth(bearerToken, user);
  }
}
