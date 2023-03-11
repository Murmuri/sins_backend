import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  firstname: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  salt: string;
}
