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

@Controller('location')
export class LocationController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateLocationDto) {
    return '';
  }

  @Get()
  getAllLocations(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
