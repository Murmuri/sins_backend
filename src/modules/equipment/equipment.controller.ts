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
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('equipment')
export class EquipmentController {
  @Post()
  create(@Body() createDto: CreateDto) {
    return createDto;
  }

  @Get()
  getAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    return `Limit: ${limit}, Offset: ${offset}`;
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return id;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    console.log(updateDto);

    return id;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return id;
  }
}
