import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createDto: CreateDto): Promise<User> {
    let row = new User();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<User[]> {
    const rows = await this.repository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.crate_at',
        'users.update_at',
        'users.delete_at',
        'users.username',
        'users.firstname',
        'users.lastname',
        'users.email',
        'users.password',
        'users.salt',
      ])
      .where('users.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('users.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<User> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: [
        'equipments',
        'location',
        'albomes',
        'camers',
        'telescopes',
        'posts',
        'photos',
      ],
    });
  }

  async update(updateDto: UpdateDto): Promise<User> {
    const { id } = updateDto;

    const row: User = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: User = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<User> {
    const row: User = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: User = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
