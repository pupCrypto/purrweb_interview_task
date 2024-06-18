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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import UserService from './user.service';
import { UserDto, UpdateUserEmailDto } from './user.dto';
import { AuthGuard, AuthParam } from 'src/auth/auth.decorator';
import Auth from 'src/auth/auth';
import { EmailsMustDifferError } from './errors';
import { UserSwagger } from 'src/swagger/user.swagger';

@ApiTags('users')
@Controller()
export default class UserController {
  constructor(private readonly service: UserService) {}

  @ApiBearerAuth()
  @UserSwagger.getInfo_200_response()
  @UserSwagger.getInfo_403_response()
  @Get('/users')
  @UseGuards(AuthGuard)
  async getInfo(
    @AuthParam() auth: Auth,
    @Query('add-relation', new ParseBoolPipe({ optional: true }))
    addRelation?: boolean,
  ) {
    return await this.service.getInfo(auth.user.id, addRelation);
  }

  @ApiBearerAuth()
  @UserSwagger.updateEmail_200_response()
  @UserSwagger.updateEmail_400_response()
  @Put('/users')
  @UseGuards(AuthGuard)
  async updateEmail(@AuthParam() auth: Auth, @Body() dto: UpdateUserEmailDto) {
    if (auth.user.email === dto.email) {
      throw new EmailsMustDifferError();
    }
    return await this.service.updateEmail(auth.user.id, dto.email);
  }

  @UserSwagger.login_200_response()
  @UserSwagger.login_404_response()
  @Post('/users/login')
  async login(@Body() dto: UserDto) {
    return await this.service.login(dto.email, dto.password);
  }

  @UserSwagger.register_200_response()
  @UserSwagger.register_400_response()
  @Post('/users/register')
  async register(@Body() dto: UserDto) {
    return await this.service.register(dto.email, dto.password);
  }
}
