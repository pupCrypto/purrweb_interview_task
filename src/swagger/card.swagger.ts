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

export class CardSwagger extends BaseSwagger {
  static deleteCards_200_response() {
    class DeleteCards200 {
      @ApiProperty({ example: MSG.CARDS_DELETED })
      message: string;
      @ApiProperty({ example: STATUS.OK })
      status: string;
    }
    return ApiOkResponse({
      type: () => DeleteCards200,
    });
  }
  static deleteCards_403_response() {
    return this.accessDenied_403_response();
  }
  static updateCard_403_response() {
    return this.accessDenied_403_response();
  }
  static updateCard_200_response() {
    class UpdateCard200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.CARD_UPDATED })
      message: string;
    }
    return ApiOkResponse({
      type: () => UpdateCard200,
    });
  }
  static getCards_200_response() {
    class GetCards200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: [{ id: 1, column_id: 1, name: 'Card Name' }] })
      cards: object[];
    }
    return ApiOkResponse({
      type: () => GetCards200,
    });
  }

  static getCards_403_response() {
    return this.accessDenied_403_response();
  }

  static getCard_200_response() {
    class GetCard200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: 'Card name' })
      name: string;
      @ApiProperty({ example: 1 })
      column_id: number;
      @ApiProperty({ example: 1 })
      id: number;
    }
    return ApiOkResponse({
      type: () => GetCard200,
    });
  }

  static getCard_404_response() {
    class GetCard404 {
      @ApiProperty({ example: 404 })
      statusCode: number;
      @ApiProperty({ example: MSG.CARD_NOT_FOUND })
      message: string;
    }
    return ApiNotFoundResponse({
      type: () => GetCard404,
    });
  }

  static getCard_403_response() {
    return this.accessDenied_403_response();
  }

  static createCard_201_response() {
    class CreateCardResponse200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.CARD_CREATED })
      message: MSG;
    }
    return ApiCreatedResponse({
      description: 'The card was created',
      type: () => CreateCardResponse200,
    });
  }

  static createCard_400_response() {
    class CreateCardResponse400 {
      @ApiProperty({ example: 400 })
      statusCode: number;
      @ApiProperty({ example: MSG.CARD_NAME_CANNOT_DUPLICATE })
      message: MSG;
    }
    return ApiBadRequestResponse({
      type: () => CreateCardResponse400,
    });
  }

  static deleteCard_200_response() {
    class DeleteCardResponse200 {
      @ApiProperty({ example: STATUS.OK })
      status: STATUS;
      @ApiProperty({ example: MSG.CARD_DELETED })
      message: MSG;
    }
    return ApiOkResponse({
      type: () => DeleteCardResponse200,
    });
  }

  static deleteCard_403_response() {
    return this.accessDenied_403_response();
  }
}
