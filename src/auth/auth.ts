import { User } from 'src/db/models';
import { AccessToken } from './auth.types';

export default class Auth {
  readonly accessToken: AccessToken;
  readonly userEntity: User;

  constructor(accessToken: AccessToken, userEntity: User) {
    this.accessToken = accessToken;
    this.userEntity = userEntity;
  }

  get user() {
    return this.userEntity;
  }
}
