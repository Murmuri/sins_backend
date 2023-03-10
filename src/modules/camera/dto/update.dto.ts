import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  name: string;
}
