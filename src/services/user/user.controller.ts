import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import UserService from './user.service';
import { RegisterUser } from './user.schema.request';
import STATUS from 'src/resp/status';
import MSG from 'src/resp/msg';

@Controller()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users/:id')
  async getInfo(@Param('id') id: number) {
    return id;
  }

  @Post('/users')
  async register(@Body() body: RegisterUser) {
    this.userService.register(body.email, body.password);
    return { status: STATUS.OK, email: body.email, msg: MSG.USER_REGISTERED };
  }
}
