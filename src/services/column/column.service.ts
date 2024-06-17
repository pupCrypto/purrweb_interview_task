import { Injectable } from '@nestjs/common';
import { DbColumnService } from 'src/db/services';
import { BadRequest, IntentionalInternalServerError } from 'src/errors';
import MSG from 'src/resp/msg';
import STATUS from 'src/resp/status';
import { isNull } from 'src/utils/utils';

import { ColumnNotFound } from './column.errors';

@Injectable()
export default class ColumnService {
  constructor(private readonly columnsMan: DbColumnService) {}

  async createColumn(userId: number, name: string) {
    try {
      const column = await this.columnsMan.createColumn(userId, name);
      return { status: STATUS.OK, msg: MSG.COLUMN_CREATED, id: column.id };
    } catch (e) {
      switch (e.code) {
        case '23505': {
          throw new BadRequest(MSG.DUPLICATE_COLUMN_NAME);
        }
        default: {
          throw new IntentionalInternalServerError();
        }
      }
    }
  }

  async getColumn(userId: number, colId: number) {
    const column = await this.columnsMan.getColumn(userId, colId);
    if (isNull(column)) {
      throw new ColumnNotFound();
    }
    return { status: STATUS.OK, ...column };
  }

  async getColumns(userId: number) {
    const columns = await this.columnsMan.getColumns(userId);
    return { status: STATUS.OK, columns: columns };
  }

  async updateColumn(userId: number, colId: number, name: string) {
    await this.columnsMan.updateColumn(userId, colId, name);
    return { status: STATUS.OK, msg: MSG.COLUMN_UPDATED };
  }
}
