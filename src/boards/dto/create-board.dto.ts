import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ description: 'The name of the board' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the board' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The required role to access this board', enum: ['user', 'admin'] })
  @IsString()
  @IsIn(['user', 'admin'])
  requiredRole: string;
}