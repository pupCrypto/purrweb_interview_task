import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import UserService from './user.service';
import { UserDto, UpdateUserEmailDto } from './user.dto';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';
import Auth from 'src/auth/auth';
import { EmailsMustDifferError } from './errors';
import { strictUserValidation } from 'src/auth/misc';

@Controller()
export default class UserController {
  constructor(private readonly service: UserService) {}

  @Get('/users/:id')
  async getInfo(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getInfo(id);
  }

  @Put('/users/:id')
  @UseGuards(AuthGuard)
  async updateEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserEmailDto,
    @AuthParam() auth: Auth,
  ) {
    strictUserValidation(auth, id);
    if (auth.user.email === dto.email) {
      throw new EmailsMustDifferError();
    }
    return await this.service.updateEmail(id, dto.email);
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
