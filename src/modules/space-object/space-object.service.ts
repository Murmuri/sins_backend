import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceObject } from 'src/entity/SpaceObject';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class SpaceObjectService {
  constructor(
    @InjectRepository(SpaceObject)
    private readonly repository: Repository<SpaceObject>,
  ) {}

  async create(createDto: CreateDto): Promise<SpaceObject> {
    let row = new SpaceObject();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<SpaceObject[]> {
    const rows = await this.repository
      .createQueryBuilder('space_objects')
      .select([
        'space_objects.id',
        'space_objects.crate_at',
        'space_objects.update_at',
        'space_objects.delete_at',
        'space_objects.name',
        'space_objects.discription',
        'space_objects.type',
        'space_objects.catalog',
        'space_objects.number',
        'space_objects.map',
      ])
      .where('space_objects.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('space_objects.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<SpaceObject> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: ['posts', 'photos'],
    });
  }

  async update(updateDto: UpdateDto): Promise<SpaceObject> {
    const { id } = updateDto;

    const row: SpaceObject = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: SpaceObject = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<SpaceObject> {
    const row: SpaceObject = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: SpaceObject = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
