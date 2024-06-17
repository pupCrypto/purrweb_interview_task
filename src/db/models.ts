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

  @OneToMany(() => UserColumn, (column) => column.user)
  columns: UserColumn[];
}

@Entity()
@Unique(['user_id', 'name'])
export class UserColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, length: 64 })
  name: string;

  @Column()
  user_id: number;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}

@Entity()
@Unique(['column_id', 'name'])
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserColumn, { nullable: false })
  @JoinColumn({ name: 'column_id' })
  column: UserColumn;

  @Column()
  column_id: number;

  @Column({ nullable: false, length: 64 })
  name: string;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];
}

@Entity()
@Unique(['card_id', 'content'])
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, { nullable: false })
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  card_id: number;

  @Column({ nullable: false, length: 128 })
  content: string;
}
