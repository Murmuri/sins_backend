import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
