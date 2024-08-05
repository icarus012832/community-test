import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, BoardType } from './board.entity'; 
import { Post } from './post.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { BoardListResponseDto } from './dto/board-list.dto';
import { BoardResponseDto } from './dto/board-response.dto';
import { PostListResponseDto } from './dto/post-list.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from '../users/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<BoardResponseDto> {
    const board = this.boardRepository.create(createBoardDto);
    const savedBoard = await this.boardRepository.save(board);
    return this.toBoardResponseDto(savedBoard);
  }

  async getAllBoards(page: number = 1, limit: number = 10): Promise<BoardListResponseDto> {
    const [boards, total] = await this.boardRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });
  
    return {
      boards: boards.map(this.toBoardResponseDto),
      total,
      page,
      limit,
    };
  }

  async getBoardById(id: number): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return this.toBoardResponseDto(board);
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    Object.assign(board, updateBoardDto);
    const updatedBoard = await this.boardRepository.save(board);
    return this.toBoardResponseDto(updatedBoard);
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<PostResponseDto> {
    const board = await this.boardRepository.findOne({ where: { id: createPostDto.boardId } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${createPostDto.boardId} not found`);
    }

    this.checkPostPermission(board, user);

    const post = this.postRepository.create({
      ...createPostDto,
      board,
      author: user,
    });
    const savedPost = await this.postRepository.save(post);
    return this.toPostResponseDto(savedPost);
  }

  async getPostById(id: number): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({ 
      where: { id }, 
      relations: ['author', 'board'] 
    });
    
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.toPostResponseDto(post);
  }

  async getPostsByBoardId(boardId: number, page: number = 1, limit: number = 10): Promise<PostListResponseDto> {
    const [posts, total] = await this.postRepository.findAndCount({
      where: { board: { id: boardId } },
      relations: ['author', 'board'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      posts: posts.map(this.toPostResponseDto),
      total,
      page,
      limit,
    };
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, user: User): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({ 
      where: { id }, 
      relations: ['author', 'board'] 
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.checkPostUpdateDeletePermission(post, user);

    Object.assign(post, updatePostDto);
    const updatedPost = await this.postRepository.save(post);
    return this.toPostResponseDto(updatedPost);
  }

  async deletePost(id: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne({ 
      where: { id }, 
      relations: ['author', 'board'] 
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    this.checkPostUpdateDeletePermission(post, user);

    await this.postRepository.remove(post);
  }

  private checkPostPermission(board: Board, user: User): void {
    if (board.type === BoardType.NOTICE && user.role !== 'admin') {
      throw new ForbiddenException('Only admins can post in the notice board');
    }

    if (board.type === BoardType.ADMIN && user.role !== 'admin') {
      throw new ForbiddenException('Only admins can post in the admin board');
    }

    if (board.requiredRole !== user.role && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to post in this board');
    }
  }

  private checkPostUpdateDeletePermission(post: Post, user: User): void {
    if (post.board.type === BoardType.NOTICE && user.role !== 'admin') {
      throw new ForbiddenException('Only admins can modify posts in the notice board');
    }

    if (post.board.type === BoardType.ADMIN && user.role !== 'admin') {
      throw new ForbiddenException('Only admins can modify posts in the admin board');
    }

    if (post.author.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You are not authorized to modify this post');
    }
  }

  private toBoardResponseDto(board: Board): BoardResponseDto {
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      type: board.type,
      requiredRole: board.requiredRole,
    };
  }

  private toPostResponseDto(post: Post): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.author.id,
      authorNickname: post.author.nickname,
      boardId: post.board.id,
      boardName: post.board.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}