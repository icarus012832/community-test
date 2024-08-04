import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'The auto-generated id of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The unique user ID for login' })
  @Column({ unique: true })
  userId: string;

  @ApiProperty({ description: 'The hashed password of the user' })
  @Column()
  password: string;

  @ApiProperty({ description: 'The role of the user', example: 'user' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({ description: 'The nickname of the user' })
  @Column()
  nickname: string;

  @ApiProperty({ description: 'The date the user was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'The date the user was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}