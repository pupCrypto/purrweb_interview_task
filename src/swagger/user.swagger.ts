import {
  ApiProperty,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import STATUS from '../resp/status';
import MSG from '../resp/msg';
import BaseSwagger from './base.swagger';

export class UserSwagger extends BaseSwagger {
  static getInfo_200_response() {
    class GetInfo200 {
      @ApiProperty({ example: STATUS.OK })
      status: string;
      @ApiProperty({ example: 'email@email.email' })
      email: string;
      @ApiProperty({ example: 1 })
      id: number;
    }
    return ApiOkResponse({
      type: () => GetInfo200,
    });
  }
  static getInfo_403_response() {
    return this.accessDenied_403_response();
  }
  static updateEmail_200_response() {
    class UpdateEmail200 {
      @ApiProperty({ example: STATUS.OK })
      status: string;
      @ApiProperty({ example: MSG.USER_UPDATED })
      message: string;
    }
    return ApiOkResponse({
      type: () => UpdateEmail200,
    });
  }
  static updateEmail_400_response() {
    class UpdateEmail400 {
      @ApiProperty({ example: 400 })
      statusCode: number;
      @ApiProperty({ example: 'Bad email' })
      message: string;
    }
    return ApiBadRequestResponse({
      type: () => UpdateEmail400,
    });
  }
  static login_200_response() {
    class Login200 {
      @ApiProperty({ example: STATUS.OK })
      status: string;
      @ApiProperty({ example: 'access_token' })
      access_token: string;
    }
    return ApiOkResponse({
      type: () => Login200,
    });
  }
  static login_404_response() {
    class Login404 {
      @ApiProperty({ example: 404 })
      statusCode: number;
      @ApiProperty({ example: MSG.USER_NOT_FOUND })
      message: string;
    }
    return ApiNotFoundResponse({
      type: () => Login404,
    });
  }
  static register_200_response() {
    class Register200 {
      @ApiProperty({ example: STATUS.OK })
      status: string;
      @ApiProperty({ example: 1 })
      id: number;
      @ApiProperty({ example: 'email@email.email' })
      email: string;
      @ApiProperty({ example: MSG.USER_REGISTERED })
      message: string;
    }
    return ApiOkResponse({
      type: () => Register200,
    });
  }
  static register_400_response() {
    class Register400 {
      @ApiProperty({ example: MSG.USER_ALREADY_EXISTS })
      message: string;
      @ApiProperty({ example: 400 })
      statusCode: number;
    }
    return ApiBadRequestResponse({
      type: () => Register400,
    });
  }
}
