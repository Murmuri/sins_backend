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
  Post as P,
  UseGuards,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { Post } from 'src/entity/Post';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiBearerAuth()
@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @P()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Post })
  async create(@Body() createDto: CreateDto): Promise<Photo> {
    return await this.postService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Post] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Post[]> {
    return await this.postService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Post })
  async getById(@Param('id') id: string): Promise<Post> {
    return await this.postService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Post })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Post> {
    return await this.postService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Post })
  async remove(@Param('id') id: string): Promise<Post> {
    return await this.postService.delete(id);
  }
}
