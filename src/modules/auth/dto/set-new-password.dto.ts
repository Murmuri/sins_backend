import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetNewPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  token: string;
}
