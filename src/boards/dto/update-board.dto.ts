import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BoardType } from '../board.entity';

export class UpdateBoardDto {
  @ApiPropertyOptional({ description: 'The name of the board' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'The description of the board' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'The type of the board', enum: BoardType })
  @IsEnum(BoardType)
  @IsOptional()
  type?: BoardType;

  @ApiPropertyOptional({ description: 'The required role to access this board', enum: ['user', 'admin'] })
  @IsString()
  @IsEnum(['user', 'admin'])
  @IsOptional()
  requiredRole?: string;
}