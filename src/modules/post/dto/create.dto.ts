import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  discription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => Date)
  start_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => Date)
  end_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  weather: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  plane: string;
}
