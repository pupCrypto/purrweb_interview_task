import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserController from './user.controller';
import UserService from './user.service';
import { DbUserService } from 'src/db/services';
import { User } from 'src/db/models';
import AuthService from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [DbUserService, UserService, AuthService],
})
export default class UserModule {}
