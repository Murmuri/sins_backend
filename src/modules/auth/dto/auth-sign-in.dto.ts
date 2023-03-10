import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
