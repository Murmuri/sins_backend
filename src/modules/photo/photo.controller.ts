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

@Controller('photo')
export class PhotoController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreatePhotoDto) {
    return '';
  }

  @Get()
  getAllPhotos(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getPhotoById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
