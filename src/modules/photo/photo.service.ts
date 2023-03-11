import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from 'src/entity/Photo';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly repository: Repository<Photo>,
  ) {}

  async create(createDto: CreateDto): Promise<Photo> {
    let row = new Photo();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Photo[]> {
    const rows = await this.repository
      .createQueryBuilder('photos')
      .select([
        'photos.id',
        'photos.crate_at',
        'photos.update_at',
        'photos.delete_at',
        'photos.name',
        'photos.discription',
        'photos.date',
      ])
      .where('photos.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('photos.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Photo> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: [
        'user',
        'albomes',
        'camera',
        'equipments',
        'location',
        'telescope',
        'spaceObjects',
        'posts',
        'titlePosts',
      ],
    });
  }

  async update(updateDto: UpdateDto): Promise<Photo> {
    const { id } = updateDto;

    const row: Photo = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Photo = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Photo> {
    const row: Photo = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Photo = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
