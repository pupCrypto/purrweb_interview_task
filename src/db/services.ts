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

  async createComment(cardId: number, content: string): Promise<Comment> {
    return await this.commentsRepository.save({ card_id: cardId, content });
  }

  async deleteComment(cardId: number, comId: number) {
    return await this.commentsRepository
      .createQueryBuilder('comments')
      .delete()
      .where('comments.card_id = :cardId', { cardId })
      .andWhere('comments.id = :comId', { comId })
      .execute();
  }

  async deleteComments(cardId: number) {
    return await this.commentsRepository
      .createQueryBuilder('comments')
      .delete()
      .where('comments.card_id = :cardId', { cardId })
      .execute();
  }

  async getComment(
    userId: number,
    colId: number,
    cardId: number,
    commentId: number,
  ): Promise<Comment> {
    return await this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoin('cards', 'cards', 'cards.id = :cardId', { cardId })
      .leftJoin('columns', 'columns', 'columns.id = :colId', {
        colId,
      })
      .where('columns.user_id = :userId', { userId })
      .andWhere('columns.id = :colId', { colId })
      .andWhere('cards.id = :cardId', { cardId })
      .andWhere('comments.id = :commentId', { commentId })
      .getOne();
  }

  async getComments(
    userId: number,
    colId: number,
    cardId: number,
  ): Promise<Comment[]> {
    return await this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoin('cards', 'cards', 'cards.id = :cardId', { cardId })
      .leftJoin('columns', 'columns', 'columns.id = :colId', {
        colId,
      })
      .where('columns.user_id = :userId', { userId })
      .andWhere('columns.id = :colId', { colId })
      .andWhere('cards.id = :cardId', { cardId })
      .getMany();
  }

  async updateComment(commentId: number, content: string): Promise<Comment> {
    return await this.commentsRepository.save({ id: commentId, content });
  }
}

@Injectable()
export class DbCardService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async createCard(colId: number, name: string): Promise<Card> {
    return await this.cardsRepository.save({ name, column_id: colId });
  }

  async deleteCard(colId: number, cardId: number) {
    return await this.cardsRepository
      .createQueryBuilder('cards')
      .delete()
      .from(Card)
      .where('cards.column_id = :colId', { colId })
      .andWhere('cards.id = :cardId', { cardId })
      .execute();
  }

  async deleteCards(colId: number) {
    return await this.cardsRepository
      .createQueryBuilder('cards')
      .delete()
      .where('cards.column_id = :colId', { colId })
      .execute();
  }

  async getCard(
    userId: number,
    colId: number,
    cardId: number,
    addRelation: boolean = false,
  ): Promise<Card> {
    let primeSelect = this.cardsRepository
      .createQueryBuilder('cards')
      .select('cards')
      .leftJoin('columns', 'columns', 'columns.id = :colId', {
        colId,
      });
    if (addRelation) {
      primeSelect = primeSelect.leftJoinAndSelect('cards.comments', 'comments');
    }
    return await primeSelect
      .where('columns.user_id = :userId', { userId })
      .andWhere('columns.id = :colId', { colId })
      .andWhere('cards.id = :cardId', { cardId })
      .getOne();
  }

  async getCards(
    userId: number,
    colId: number,
    addRelation: boolean = false,
  ): Promise<Card[]> {
    let primeSelect = this.cardsRepository
      .createQueryBuilder('cards')
      .leftJoin('columns', 'columns', 'columns.id = :colId', {
        colId,
      });
    if (addRelation) {
      primeSelect = primeSelect.leftJoinAndSelect('cards.comments', 'comments');
    }
    return await primeSelect
      .where('columns.user_id = :userId', { userId })
      .andWhere('columns.id = :colId', { colId })
      .getMany();
  }

  async updateCard(cardId: number, name: string): Promise<Card> {
    return await this.cardsRepository.save({ id: cardId, name });
  }
}

@Injectable()
export class DbColumnService {
  constructor(
    @InjectRepository(UserColumn)
    private colsRepository: Repository<UserColumn>,
  ) {}

  async createColumn(userId: number, name: string): Promise<UserColumn> {
    return this.colsRepository.save({ name, user_id: userId });
  }

  async deleteColumn(userId: number, colId: number) {
    return await this.colsRepository
      .createQueryBuilder('columns')
      .delete()
      .where('columns.user_id = :userId', { userId })
      .andWhere('columns.id = :colId', { colId })
      .execute();
  }

  async deleteColumns(userId: number) {
    return await this.colsRepository
      .createQueryBuilder('columns')
      .delete()
      .where('columns.user_id = :userId', { userId })
      .execute();
  }

  async getColumn(
    userId: number,
    colId: number,
    addRelation: boolean = false,
  ): Promise<UserColumn> {
    const relations = addRelation && ['cards'];
    const columns = await this.colsRepository.find({
      where: { id: colId, user_id: userId },
      relations,
    });
    return columns.pop();
  }

  async getColumns(
    userId: number,
    addRelation: boolean = false,
  ): Promise<UserColumn[]> {
    const relations = addRelation && ['cards'];
    return await this.colsRepository.find({
      where: { user_id: userId },
      relations,
    });
  }

  async updateColumn(
    userId: number,
    colId: number,
    name: string,
  ): Promise<UserColumn> {
    return await this.colsRepository.save({ id: colId, user_id: userId, name });
  }
}

@Injectable()
export class DbUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    return await this.usersRepository.save({ email, password });
  }

  async getUser(id: number, addRelation: boolean = false): Promise<User> {
    const relations = addRelation && ['columns'];
    const users = await this.usersRepository.find({
      where: { id },
      relations,
    });
    return users.pop();
  }

  async getUserByCred(email: string, password: string): Promise<User> {
    const users = await this.usersRepository.find({
      where: { email, password },
      relations: ['columns'],
    });
    return users.pop();
  }

  async updateEmail(id: number, email: string): Promise<User> {
    return await this.usersRepository.save({ id, email });
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email });
    return isNotNull(user);
  }
}
