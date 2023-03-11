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
import { SpaceObject } from 'src/entity/SpaceObject';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpaceObjectService } from './space-object.service';

@ApiBearerAuth()
@ApiTags('space-object')
@Controller('space-object')
export class SpaceObjectController {
  constructor(private readonly spaceObjectService: SpaceObjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: SpaceObject })
  async create(@Body() createDto: CreateDto): Promise<SpaceObject> {
    return await this.spaceObjectService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [SpaceObject] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<SpaceObject[]> {
    return await this.spaceObjectService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: SpaceObject })
  async getById(@Param('id') id: string): Promise<SpaceObject> {
    return await this.spaceObjectService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: SpaceObject })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<SpaceObject> {
    return await this.spaceObjectService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: SpaceObject })
  async remove(@Param('id') id: string): Promise<SpaceObject> {
    return await this.spaceObjectService.delete(id);
  }
}
