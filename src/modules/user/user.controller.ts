import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateUserDto) {
    return '';
  }

  @Get()
  getAllUsers(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
