import { ApiProperty } from '@nestjs/swagger';
import { BoardResponseDto } from './board-response.dto';

export class BoardListResponseDto {
  @ApiProperty({ description: 'The list of boards', type: [BoardResponseDto] })
  boards: BoardResponseDto[];

  @ApiProperty({ description: 'The total number of boards' })
  total: number;

  @ApiProperty({ description: 'The current page number' })
  page: number;

  @ApiProperty({ description: 'The number of boards per page' })
  limit: number;
}