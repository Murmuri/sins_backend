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
import { Telescope } from 'src/entity/Telescope';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelescopeService } from './telescope.service';

@ApiBearerAuth()
@ApiTags('telescope')
@Controller('telescope')
export class TelescopeController {
  constructor(private readonly telescopeService: TelescopeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Telescope })
  async create(@Body() createDto: CreateDto): Promise<Telescope> {
    return await this.telescopeService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Telescope] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Telescope[]> {
    return await this.telescopeService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Telescope })
  async getById(@Param('id') id: string): Promise<Telescope> {
    return await this.telescopeService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Telescope })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Telescope> {
    return await this.telescopeService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Telescope })
  async remove(@Param('id') id: string): Promise<Telescope> {
    return await this.telescopeService.delete(id);
  }
}
