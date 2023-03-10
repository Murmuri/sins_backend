import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;
}
