import { ApiProperty } from '@nestjs/swagger';

export class GetUsersDto {
  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;
}
