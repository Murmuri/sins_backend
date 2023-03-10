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

@Controller('equipment')
export class EquipmentController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateEquipmentDto) {
    return '';
  }

  @Get()
  getAllEquipments(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getEquipmentById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
