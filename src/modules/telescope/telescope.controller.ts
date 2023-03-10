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

@Controller('telescope')
export class TelescopeController {
  constructor() {}

  @Post()
  create(@Body() createDto: CreateTelescopeDto) {
    return '';
  }

  @Get()
  getAllTelescopes(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getTelescopeById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTelescopeDto: UpdateTelescopeDto,
  ) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
