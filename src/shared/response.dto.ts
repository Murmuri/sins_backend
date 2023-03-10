import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  readonly message: string;
}
