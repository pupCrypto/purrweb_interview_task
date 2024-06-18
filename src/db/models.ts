import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => UserColumn, (column) => column.user, { cascade: ['remove'] })
  columns: UserColumn[];
}

@Entity({ name: 'columns' })
@Unique(['user_id', 'name'])
export class UserColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, length: 64 })
  name: string;

  @Column({ nullable: true })
  user_id: number;

  @OneToMany(() => Card, (card) => card.column, { cascade: ['remove'] })
  cards: Card[];
}

@Entity({ name: 'cards' })
@Unique(['column_id', 'name'])
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserColumn, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'column_id' })
  column: UserColumn;

  @Column({ nullable: true })
  column_id: number;

  @Column({ nullable: false, length: 64 })
  name: string;

  @OneToMany(() => Comment, (comment) => comment.card, { cascade: ['remove'] })
  comments: Comment[];
}

@Entity({ name: 'comments' })
@Unique(['card_id', 'content'])
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column({ nullable: true })
  card_id: number;

  @Column({ nullable: false, length: 128 })
  content: string;
}
