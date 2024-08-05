import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';

export enum BoardType {
  NOTICE = 'notice',
  FREE = 'free',
  ADMIN = 'admin'
}

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: BoardType,
    default: BoardType.FREE
  })
  type: BoardType;

  @Column({ default: 'user' })
  requiredRole: string;

  @OneToMany(() => Post, (post: Post) => post.board)
  posts: Post[];
}