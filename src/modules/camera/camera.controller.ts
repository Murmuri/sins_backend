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
import { Camera } from 'src/entity/Camera';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CameraService } from './camera.service';

@ApiBearerAuth()
@ApiTags('camera')
@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Camera })
  async create(@Body() createDto: CreateDto): Promise<Camera> {
    return await this.cameraService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Camera] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Camera[]> {
    return await this.cameraService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Camera })
  async getById(@Param('id') id: string): Promise<Camera> {
    return await this.cameraService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Camera })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Camera> {
    return await this.cameraService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Camera })
  async remove(@Param('id') id: string): Promise<Camera> {
    return await this.cameraService.delete(id);
  }
}
