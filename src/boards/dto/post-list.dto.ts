import { ApiProperty } from '@nestjs/swagger';
import { PostResponseDto } from './post-response.dto';

export class PostListResponseDto {
  @ApiProperty({ description: 'The list of posts', type: [PostResponseDto] })
  posts: PostResponseDto[];

  @ApiProperty({ description: 'The total number of posts' })
  total: number;

  @ApiProperty({ description: 'The current page number' })
  page: number;

  @ApiProperty({ description: 'The number of posts per page' })
  limit: number;
}