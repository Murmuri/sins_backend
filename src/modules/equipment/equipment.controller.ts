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
import { Equipment } from 'src/entity/Equipment';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EquipmentService } from './equipment.service';

@ApiBearerAuth()
@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Equipment })
  async create(@Body() createDto: CreateDto): Promise<Equipment> {
    return await this.equipmentService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [Equipment] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<Equipment[]> {
    return await this.equipmentService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: Equipment })
  async getById(@Param('id') id: string): Promise<Equipment> {
    return await this.equipmentService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Equipment })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<Equipment> {
    return await this.equipmentService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Equipment })
  async remove(@Param('id') id: string): Promise<Equipment> {
    return await this.equipmentService.delete(id);
  }
}
