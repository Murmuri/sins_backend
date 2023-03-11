import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telescope } from 'src/entity/Telescope';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class TelescopeService {
  constructor(
    @InjectRepository(Telescope)
    private readonly repository: Repository<Telescope>,
  ) {}

  async create(createDto: CreateDto): Promise<Telescope> {
    let row = new Telescope();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Telescope[]> {
    const rows = await this.repository
      .createQueryBuilder('telescopes')
      .select([
        'telescopes.id',
        'telescopes.crate_at',
        'telescopes.update_at',
        'telescopes.delete_at',
        'telescopes.name',
        'telescopes.discription',
        'telescopes.type',
        'telescopes.focal_length',
        'telescopes.aperture',
      ])
      .where('telescopes.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('telescopes.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Telescope> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: ['user', 'photos', 'posts'],
    });
  }

  async update(updateDto: UpdateDto): Promise<Telescope> {
    const { id } = updateDto;

    const row: Telescope = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Telescope = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Telescope> {
    const row: Telescope = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Telescope = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
