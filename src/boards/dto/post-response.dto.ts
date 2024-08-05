import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ description: 'The ID of the post' })
  id: number;

  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  content: string;

  @ApiProperty({ description: 'The ID of the author' })
  authorId: number;

  @ApiProperty({ description: 'The nickname of the author' })
  authorNickname: string;

  @ApiProperty({ description: 'The ID of the board' })
  boardId: number;

  @ApiProperty({ description: 'The name of the board' })
  boardName: string;

  @ApiProperty({ description: 'The creation date of the post' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the post' })
  updatedAt: Date;
}