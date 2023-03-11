import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
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
  focal_length: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  aperture: string;
}
