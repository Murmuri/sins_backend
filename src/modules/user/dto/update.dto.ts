import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => Number)
  id: number;

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
}
