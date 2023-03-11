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
import { Location } from 'src/entity/Location';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiBearerAuth()
@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Location })
  async create(@Body() createDto: CreateDto): Promise<Location> {
    return await this.locationService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Location] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Location[]> {
    return await this.locationService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Location })
  async getById(@Param('id') id: string): Promise<Location> {
    return await this.locationService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Location })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Location> {
    return await this.locationService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Location })
  async remove(@Param('id') id: string): Promise<Location> {
    return await this.locationService.delete(id);
  }
}
