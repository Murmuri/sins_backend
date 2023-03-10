import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignUpDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  firstname: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  lastname: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  username: string;
}
