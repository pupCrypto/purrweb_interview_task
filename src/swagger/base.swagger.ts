import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export default class BaseSwagger {
  static accessDenied_403_response() {
    class AccessDenied403 {
      @ApiProperty({ example: 403 })
      statusCode: number;
      @ApiProperty({ example: 'Access Denied' })
      message: string;
    }
    return ApiResponse({
      status: 403,
      type: () => AccessDenied403,
    });
  }
}
