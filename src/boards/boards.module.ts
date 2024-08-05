// src/boards/boards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Post])],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService] 
})
export class BoardsModule {}