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
  @IsOptional()
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  discription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  catalog: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => Number)
  number: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  map: string;
}
