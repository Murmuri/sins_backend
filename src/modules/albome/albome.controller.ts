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

@Controller('albome')
export class AlbomeController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateAlbomeDto) {
    return '';
  }

  @Get()
  getAllAlbomes(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getAlbomeById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbomeDto: UpdateAlbomeDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
