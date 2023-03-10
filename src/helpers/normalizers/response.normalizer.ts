import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  payload?: T;
}

export const makeResponse = <T>(
  success = true,
  message = 'success',
  data?: T,
): IResponse<T> => {
  return {
    success,
    message: message || void 0,
    payload: data,
  };
};
