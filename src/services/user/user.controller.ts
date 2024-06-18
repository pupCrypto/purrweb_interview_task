import {
  Controller,
  Get,
  ParseBoolPipe,
  Post,
  Body,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import UserService from './user.service';
import { UserDto, UpdateUserEmailDto } from './user.dto';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';
import Auth from 'src/auth/auth';
import { EmailsMustDifferError } from './errors';

@Controller()
export default class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/users')
  @UseGuards(AuthGuard)
  async getInfo(
    @AuthParam() auth: Auth,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getInfo(auth.user.id, addRelation);
  }

  @Put('/users')
  @UseGuards(AuthGuard)
  async updateEmail(@AuthParam() auth: Auth, @Body() dto: UpdateUserEmailDto) {
    if (auth.user.email === dto.email) {
      throw new EmailsMustDifferError();
    }
    return await this.service.updateEmail(auth.user.id, dto.email);
  }

  @Post('/users/login')
  async login(@Body() dto: UserDto) {
    return await this.service.login(dto.email, dto.password);
  }

  @Post('/users/register')
  async register(@Body() dto: UserDto) {
    return await this.service.register(dto.email, dto.password);
  }
}
