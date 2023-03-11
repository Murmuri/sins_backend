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
  UseGuards,
} from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { Photo } from 'src/entity/Photo';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotoService } from './photo.service';

@ApiBearerAuth()
@ApiTags('photo')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Photo })
  async create(@Body() createDto: CreateDto): Promise<Photo> {
    return await this.photoService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Photo] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Photo[]> {
    return await this.photoService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Photo })
  async getById(@Param('id') id: string): Promise<Photo> {
    return await this.photoService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Photo })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Photo> {
    return await this.photoService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Photo })
  async remove(@Param('id') id: string): Promise<Photo> {
    return await this.photoService.delete(id);
  }
}
