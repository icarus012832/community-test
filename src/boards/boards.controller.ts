import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../users/user.entity';
import { GetUser } from '../users/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BoardResponseDto } from './dto/board-response.dto';
import { BoardListResponseDto } from './dto/board-list.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { PostListResponseDto } from './dto/post-list.dto';

@ApiTags('boards')
@Controller('boards')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 201, description: 'The board has been successfully created.', type: BoardResponseDto })
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return all boards.', type: BoardListResponseDto })
  async getAllBoards(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<BoardListResponseDto> {
    return this.boardsService.getAllBoards(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a board' })
  @ApiResponse({ status: 200, description: 'Return a board.', type: BoardResponseDto })
  async getBoardById(@Param('id') id: number): Promise<BoardResponseDto> {
    return this.boardsService.getBoardById(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a board' })
  @ApiResponse({ status: 200, description: 'The board has been successfully updated.', type: BoardResponseDto })
  async updateBoard(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<BoardResponseDto> {
    return this.boardsService.updateBoard(id, updateBoardDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a board' })
  @ApiResponse({ status: 200, description: 'The board has been successfully deleted.' })
  async deleteBoard(@Param('id') id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Post(':id/posts')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: PostResponseDto })
  async createPost(
    @Param('id') boardId: number,
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostResponseDto> {
    createPostDto.boardId = boardId;
    return this.boardsService.createPost(createPostDto, user);
  }

  @Get(':id/posts')
  @ApiOperation({ summary: 'Get all posts for a board' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Return all posts for a board.', type: PostListResponseDto })
  async getPostsByBoardId(
    @Param('id') boardId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<PostListResponseDto> {
    return this.boardsService.getPostsByBoardId(boardId, page, limit);
  }

  @Get('posts/:id')
  @ApiOperation({ summary: 'Get a post' })
  @ApiResponse({ status: 200, description: 'Return a post.', type: PostResponseDto })
  async getPostById(@Param('id') id: number): Promise<PostResponseDto> {
    return this.boardsService.getPostById(id);
  }

  @Put('posts/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.', type: PostResponseDto })
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ): Promise<PostResponseDto> {
    return this.boardsService.updatePost(id, updatePostDto, user);
  }

  @Delete('posts/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'The post has been successfully deleted.' })
  async deletePost(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.boardsService.deletePost(id, user);
  }
}