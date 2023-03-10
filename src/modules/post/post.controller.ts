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

@Controller('post')
export class PostController {
  @Post()
  create(@Body() createDto: CreatePostDto) {
    return '';
  }

  @Get()
  getAllPosts(@Query() query: ListAllEntities) {
    return [];
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return '';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return '';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return '';
  }
}
