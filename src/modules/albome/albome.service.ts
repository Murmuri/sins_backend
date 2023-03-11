import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Albome } from 'src/entity/Albome';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AlbomeService {
  constructor(
    @InjectRepository(Albome)
    private readonly repository: Repository<Albome>,
  ) {}

  async create(createDto: CreateDto): Promise<Albome> {
    let row = new Albome();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Albome[]> {
    const rows = await this.repository
      .createQueryBuilder('albomes')
      .select([
        'albomes.id',
        'albomes.crate_at',
        'albomes.update_at',
        'albomes.delete_at',
        'albomes.name',
        'albomes.discription',
        'albomes.tag',
      ])
      .where('albomes.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('albomes.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Albome> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: ['user', 'photos'],
    });
  }

  async update(updateDto: UpdateDto): Promise<Albome> {
    const { id } = updateDto;

    const row: Albome = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Albome = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Albome> {
    const row: Albome = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Albome = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
