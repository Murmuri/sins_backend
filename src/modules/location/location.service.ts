import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/entity/Location';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly repository: Repository<Location>,
  ) {}

  async create(createDto: CreateDto): Promise<Location> {
    let row = new Location();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Location[]> {
    const rows: Location[] = await this.repository
      .createQueryBuilder('locations')
      .select([
        'locations.id',
        'locations.crate_at',
        'locations.update_at',
        'locations.delete_at',
        'locations.name',
        'locations.discription',
        'locations.latitude',
        'locations.longitude',
      ])
      .where('equipments.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('equipments.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Location> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: ['user', 'photos', 'posts'],
    });
  }

  async update(updateDto: UpdateDto): Promise<Location> {
    const { id } = updateDto;

    const row: Location = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Location = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Location> {
    const row: Location = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Location = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
