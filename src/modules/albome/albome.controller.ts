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
import { Albome } from 'src/entity/Albome';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlbomeService } from './albome.service';

@ApiBearerAuth()
@ApiTags('albome')
@Controller('albome')
export class AlbomeController {
  constructor(private readonly albomeService: AlbomeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Albome })
  async create(@Body() createDto: CreateDto): Promise<Albome> {
    return await this.albomeService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Albome] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Albome[]> {
    return await this.albomeService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Albome })
  async getById(@Param('id') id: string): Promise<Albome> {
    return await this.albomeService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Albome })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Albome> {
    return await this.albomeService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Albome })
  async remove(@Param('id') id: string): Promise<Albome> {
    return await this.albomeService.delete(id);
  }
}
