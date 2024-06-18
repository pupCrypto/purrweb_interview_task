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

  async getComment(
    userId: number,
    colId: number,
    cardId: number,
    commentId: number,
  ): Promise<Comment> {
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

  async getComments(
    userId: number,
    colId: number,
    cardId: number,
  ): Promise<Comment[]> {
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

  async getCard(
    userId: number,
    colId: number,
    cardId: number,
    addRelation: boolean = false,
  ): Promise<Card> {
    let primeSelect = this.cardsRepository
      .createQueryBuilder('card')
      .leftJoin('user_column', 'user_column', 'user_column.id = :colId', {
        colId,
      });
    if (addRelation) {
      primeSelect = primeSelect.leftJoinAndSelect('card.comments', 'comments');
    }
    return await primeSelect
      .where('user_column.user_id = :userId', { userId })
      .andWhere('user_column.id = :colId', { colId })
      .andWhere('card.id = :cardId', { cardId })
      .getOne();
  }

  async getCards(
    userId: number,
    colId: number,
    addRelation: boolean = false,
  ): Promise<Card[]> {
    let primeSelect = this.cardsRepository
      .createQueryBuilder('card')
      .leftJoin('user_column', 'user_column', 'user_column.id = :colId', {
        colId,
      });
    if (addRelation) {
      primeSelect = primeSelect.leftJoinAndSelect('card.comments', 'comments');
    }
    return await primeSelect
      .where('user_column.user_id = :userId', { userId })
      .andWhere('user_column.id = :colId', { colId })
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
