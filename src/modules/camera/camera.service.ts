import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from 'src/entity/Camera';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(Camera)
    private readonly repository: Repository<Camera>,
  ) {}

  async create(createDto: CreateDto): Promise<Camera> {
    let row = new Camera();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Camera[]> {
    const rows = await this.repository
      .createQueryBuilder('camers')
      .select([
        'camers.id',
        'camers.crate_at',
        'camers.update_at',
        'camers.delete_at',
        'camers.name',
        'camers.discription',
        'camers.type',
      ])
      .where('camers.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('camers.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Camera> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: ['users', 'photos', 'posts'],
    });
  }

  async update(updateDto: UpdateDto): Promise<Camera> {
    const { id } = updateDto;

    const row: Camera = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Camera = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Camera> {
    const row: Camera = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Camera = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
