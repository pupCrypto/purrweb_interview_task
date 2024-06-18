import {
  ApiProperty,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import STATUS from '../resp/status';
import MSG from '../resp/msg';
import BaseSwagger from './base.swagger';

export class ColumnSwagger extends BaseSwagger {
  static deleteColumns_200_response() {
    class DeleteColumns200 {
      @ApiProperty({ example: MSG.COLUMNS_DELETED })
      message: string;
      @ApiProperty({ example: STATUS.OK })
      status: string;
    }
    return ApiOkResponse({
      type: () => DeleteColumns200,
    });
  }
  static deleteColumns_403_response() {
    return this.accessDenied_403_response();
  }
  static updateColumn_403_response() {
    return this.accessDenied_403_response();
  }
  static updateColumn_200_response() {
    class UpdateColumn200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.COLUMN_UPDATED })
      message: string;
    }
    return ApiOkResponse({
      type: () => UpdateColumn200,
    });
  }
  static getColumns_200_response() {
    class GetColumns200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: [{ id: 1, user_id: 1, name: 'Column Name' }] })
      columns: object[];
    }
    return ApiOkResponse({
      type: () => GetColumns200,
    });
  }

  static getColumns_403_response() {
    return this.accessDenied_403_response();
  }

  static getColumn_200_response() {
    class GetColumn200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: 'Column name' })
      name: string;
      @ApiProperty({ example: 1 })
      user_id: number;
      @ApiProperty({ example: 1 })
      id: number;
    }
    return ApiOkResponse({
      type: () => GetColumn200,
    });
  }

  static getColumn_404_response() {
    class GetColumn404 {
      @ApiProperty({ example: 404 })
      statusCode: number;
      @ApiProperty({ example: MSG.COLUMN_NOT_FOUND })
      message: string;
    }
    return ApiNotFoundResponse({
      type: () => GetColumn404,
    });
  }

  static getColumn_403_response() {
    return this.accessDenied_403_response();
  }

  static createColumn_201_response() {
    class CreateColumnResponse200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.COLUMN_CREATED })
      message: MSG;
    }
    return ApiCreatedResponse({
      type: () => CreateColumnResponse200,
    });
  }

  static createColumn_400_response() {
    class CreateColumnResponse400 {
      @ApiProperty({ example: 400 })
      statusCode: number;
      @ApiProperty({ example: MSG.COLUMN_NAME_CANNOT_DUPLICATE })
      message: MSG;
    }
    return ApiBadRequestResponse({
      type: () => CreateColumnResponse400,
    });
  }

  static deleteColumn_200_response() {
    class DeleteColumnResponse200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.COLUMN_DELETED })
      message: MSG;
    }
    return ApiOkResponse({
      type: () => DeleteColumnResponse200,
    });
  }

  static deleteColumn_403_response() {
    return this.accessDenied_403_response();
  }
}
