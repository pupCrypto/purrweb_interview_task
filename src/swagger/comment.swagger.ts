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

export class CommentSwagger extends BaseSwagger {
  static deleteComments_200_response() {
    class DeleteComments200 {
      @ApiProperty({ example: MSG.COMMENTS_DELETED })
      message: string;
      @ApiProperty({ example: STATUS.OK })
      status: string;
    }
    return ApiOkResponse({
      type: () => DeleteComments200,
    });
  }
  static deleteComments_403_response() {
    return this.accessDenied_403_response();
  }
  static updateComment_403_response() {
    return this.accessDenied_403_response();
  }
  static updateComment_200_response() {
    class UpdateComment200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.COMMENT_UPDATED })
      message: string;
    }
    return ApiOkResponse({
      type: () => UpdateComment200,
    });
  }
  static getComments_200_response() {
    class GetComments200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: [{ id: 1, card_id: 1, name: 'Comment Name' }] })
      comments: object[];
    }
    return ApiOkResponse({
      type: () => GetComments200,
    });
  }

  static getComments_403_response() {
    return this.accessDenied_403_response();
  }

  static getComment_200_response() {
    class GetComment200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: 'Comment name' })
      name: string;
      @ApiProperty({ example: 1 })
      column_id: number;
      @ApiProperty({ example: 1 })
      id: number;
    }
    return ApiOkResponse({
      type: () => GetComment200,
    });
  }

  static getComment_404_response() {
    class GetComment404 {
      @ApiProperty({ example: 404 })
      statusCode: number;
      @ApiProperty({ example: MSG.COMMENT_NOT_FOUND })
      message: string;
    }
    return ApiNotFoundResponse({
      type: () => GetComment404,
    });
  }

  static getComment_403_response() {
    return this.accessDenied_403_response();
  }

  static createComment_201_response() {
    class CreateCommentResponse200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.COMMENT_CREATED })
      message: MSG;
    }
    return ApiCreatedResponse({
      type: () => CreateCommentResponse200,
    });
  }

  static createComment_400_response() {
    class CreateCommentResponse400 {
      @ApiProperty({ example: 400 })
      statusCode: number;
      @ApiProperty({ example: MSG.DUPLICATE_COMMENT })
      message: MSG;
    }
    return ApiBadRequestResponse({
      type: () => CreateCommentResponse400,
    });
  }

  static deleteComment_200_response() {
    class DeleteCommentResponse200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.COMMENT_DELETED })
      message: MSG;
    }
    return ApiOkResponse({
      type: () => DeleteCommentResponse200,
    });
  }

  static deleteComment_403_response() {
    return this.accessDenied_403_response();
  }
}
