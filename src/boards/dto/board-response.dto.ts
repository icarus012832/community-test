import { ApiProperty } from '@nestjs/swagger';
import { BoardType } from '../board.entity';

export class BoardResponseDto {
  @ApiProperty({ description: 'The ID of the board' })
  id: number;

  @ApiProperty({ description: 'The name of the board' })
  name: string;

  @ApiProperty({ description: 'The description of the board' })
  description: string;

  @ApiProperty({ description: 'The type of the board', enum: BoardType })
  type: BoardType;

  @ApiProperty({ description: 'The required role to access this board' })
  requiredRole: string;
}