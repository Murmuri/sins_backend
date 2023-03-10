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

@Controller('camera')
export class CameraController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateCameraDto) {
    return '';
  }

  @Get()
  getAllCameras(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getCameraById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
