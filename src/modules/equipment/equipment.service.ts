import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from 'src/entity/Equipment';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly repository: Repository<Equipment>,
  ) {}

  async create(createDto: CreateDto): Promise<Equipment> {
    let row = new Equipment();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Equipment[]> {
    const rows: Equipment[] = await this.repository
      .createQueryBuilder('equipments')
      .select([
        'equipments.id',
        'equipments.crate_at',
        'equipments.update_at',
        'equipments.delete_at',
        'equipments.name',
        'equipments.discription',
        'equipments.type',
      ])
      .where('equipments.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('equipments.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Equipment> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: ['user', 'photos', 'posts'],
    });
  }

  async update(updateDto: UpdateDto): Promise<Equipment> {
    const { id } = updateDto;

    const row: Equipment = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Equipment = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Equipment> {
    const row: Equipment = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Equipment = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
