import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The user ID for login', example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  userId: string;

  @ApiProperty({ description: 'The password for login' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}