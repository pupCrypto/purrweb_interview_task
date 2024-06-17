import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DbUserService } from 'src/db/services';
import { genSha256Hex, isNull } from 'src/utils/utils';
import MSG from 'src/resp/msg';
import STATUS from 'src/resp/status';
import { genJwtToken } from 'src/utils/jwt';

@Injectable()
export default class UserService {
  constructor(private readonly dbService: DbUserService) {}

  async getInfo(id: number) {
    const user = await this.dbService.getUser(id);
    if (isNull(user)) {
      throw new HttpException(MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return { status: STATUS.OK, id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const hashedPassword = genSha256Hex(password);
    const user = await this.dbService.getUserByCred(email, hashedPassword);
    if (isNull(user)) {
      throw new HttpException(MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const accessToken = genJwtToken({ userId: user.id });
    return { status: STATUS.OK, access_token: accessToken };
  }

  async updateEmail(id: number, email: string) {
    await this.dbService.updateEmail(id, email);
    return { status: STATUS.OK, msg: MSG.USER_UPDATED };
  }

  async register(email: string, password: string) {
    const userExists = await this.dbService.userExists(email);
    if (userExists) {
      throw new HttpException(MSG.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = genSha256Hex(password);
    const user = await this.dbService.createUser(email, hashedPassword);
    return {
      status: STATUS.OK,
      id: user.id,
      email: email,
      msg: MSG.USER_REGISTERED,
    };
  }
}
