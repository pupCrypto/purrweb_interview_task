import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card, Comment, User, UserColumn } from './models';
import { isNotNull } from 'src/utils/utils';

@Injectable()
export class DbCommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(cardId: number, name: string) {
    return await this.commentsRepository.save({ card_id: cardId, name });
  }

  async getComment(
    userId: number,
    colId: number,
    cardId: number,
    commentId: number,
  ) {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .leftJoin('card', 'card', 'card.id = :cardId', { cardId })
      .leftJoin('user_column', 'user_column', 'user_column.id = :colId', {
        colId,
      })
      .where('user_column.user_id = :userId', { userId })
      .andWhere('user_column.id = :colId', { colId })
      .andWhere('card.id = :cardId', { cardId })
      .andWhere('comment.id = :commentId', { commentId })
      .getOne();
  }

  async getComments(userId: number, colId: number, cardId: number) {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .leftJoin('card', 'card', 'card.id = :cardId', { cardId })
      .leftJoin('user_column', 'user_column', 'user_column.id = :colId', {
        colId,
      })
      .where('user_column.user_id = :userId', { userId })
      .andWhere('user_column.id = :colId', { colId })
      .andWhere('card.id = :cardId', { cardId })
      .getMany();
  }

  async updateComment(commentId: number, name: string) {
    return await this.commentsRepository.save({ id: commentId, name });
  }
}
@Injectable()
export class DbCardService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async createCard(colId: number, name: string) {
    return await this.cardsRepository.save({ name, column_id: colId });
  }

  async getCard(userId: number, colId: number, cardId: number) {
    return await this.cardsRepository
      .createQueryBuilder('card')
      .leftJoin('user_column', 'user_column', 'user_column.id = :colId', {
        colId,
      })
      .where('user_column.user_id = :userId', { userId })
      .andWhere('user_column.id = :colId', { colId })
      .andWhere('card.id = :cardId', { cardId })
      .getOne();
  }

  async getCards(userId: number, colId: number) {
    return await this.cardsRepository
      .createQueryBuilder('card')
      .leftJoin('user_column', 'user_column', 'user_column.id = :colId', {
        colId,
      })
      .where('user_column.user_id = :userId', { userId })
      .andWhere('user_column.id = :colId', { colId })
      .getMany();
  }

  async updateCard(cardId: number, name: string) {
    return await this.cardsRepository.save({ id: cardId, name });
  }
}

@Injectable()
export class DbColumnService {
  constructor(
    @InjectRepository(UserColumn)
    private colsRepository: Repository<UserColumn>,
  ) {}

  async createColumn(userId: number, name: string) {
    return this.colsRepository.save({ name, user_id: userId });
  }

  async getColumn(userId: number, colId: number) {
    return await this.colsRepository.findOneBy({ id: colId, user_id: userId });
  }

  async getColumns(userId: number) {
    return await this.colsRepository.find({ where: { user_id: userId } });
  }

  async updateColumn(userId: number, colId: number, name: string) {
    return await this.colsRepository.save({ id: colId, user_id: userId, name });
  }
}

@Injectable()
export class DbUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    return await this.usersRepository.save({ email, password });
  }

  async getUser(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async getUserByCred(email: string, password: string) {
    return await this.usersRepository.findOneBy({ email, password });
  }

  async updateEmail(id: number, email: string) {
    await this.usersRepository.save({ id, email });
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email });
    return isNotNull(user);
  }
}
