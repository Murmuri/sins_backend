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

@Controller('object')
export class ObjectController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateObjectDto) {
    return '';
  }

  @Get()
  getAllObjects(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getObjectById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateObjectDto: UpdateObjectDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
