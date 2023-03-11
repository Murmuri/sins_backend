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
import { User } from 'src/entity/User';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: User })
  async create(@Body() createDto: CreateDto): Promise<User> {
    return await this.userService.create(createDto);
  }

  @Get()
  @ApiResponse({ type: [User] })
  async getAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ): Promise<User[]> {
    return await this.userService.getAll(limit, offset);
  }

  @Get(':id')
  @ApiResponse({ type: User })
  async getById(@Param('id') id: string): Promise<User> {
    return await this.userService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: User })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<User> {
    return await this.userService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: User })
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }
}
