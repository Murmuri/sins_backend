import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entity/Post';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  async create(createDto: CreateDto): Promise<Post> {
    let row = new Post();
    row = {
      ...row,
      ...createDto,
    };

    await this.repository.save(row);

    return row;
  }

  async getAll(limit: number, offset: number): Promise<Post[]> {
    const rows = await this.repository
      .createQueryBuilder('posts')
      .select([
        'posts.id',
        'posts.crate_at',
        'posts.update_at',
        'posts.delete_at',
        'posts.title',
        'posts.discription',
        'posts.start_at',
        'posts.end_at',
        'posts.weather',
        'posts.plane',
      ])
      .where('posts.deleted_at is null')
      .limit(limit)
      .skip(offset)
      .orderBy('posts.id', 'ASC')
      .getMany();

    return rows;
  }

  async getById(id: number): Promise<Post> {
    return await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
      relations: [
        'user',
        'photos',
        'camers',
        'equipments',
        'location',
        'telescope',
        'spaceObjects',
      ],
    });
  }

  async update(updateDto: UpdateDto): Promise<Post> {
    const { id } = updateDto;

    const row: Post = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const updatedRow: Post = await this.repository.save({
      ...row,
      ...updateDto,
    });

    return updatedRow;
  }

  async delete(id: number): Promise<Post> {
    const row: Post = await this.repository.findOne({
      where: {
        id,
        delete_at: IsNull(),
      },
    });

    const deletedRow: Post = await this.repository.save({
      ...row,
      delete_at: new Date(),
    });

    return deletedRow;
  }
}
