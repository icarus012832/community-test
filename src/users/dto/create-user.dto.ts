import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The user ID', example: 'user123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @ApiProperty({ description: 'The user password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({ description: 'The user nickname', example: 'Cool User' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  nickname: string;
}
