import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './Photo';
import { Post } from './Post';

export enum ObjectTypeEnum {
  PLANET = 'planet',
  PLANETARY_NEBULA = 'planetary_nebula',
  NEBULA = 'nebula',
  SATELLITE = 'satellite',
  COMET = 'comet',
  GALAXY = 'galaxy',
  STUR = 'stur',
  METEOR = 'meteor',
  OPEN_STAR_CLUSTER = 'open_star_cluster',
  STAR_CLUSTER = 'star_cluster',
  DOUBLE_STAR = 'double_star',
}

@Entity({ name: 'space_objects' })
export class SpaceObject {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  crate_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  update_at: Date;

  @Column({ nullable: true })
  delete_at: Date;

  @Column()
  name: string;

  @Column({ nullable: true })
  discription: string;

  @Column({
    type: 'enum',
    enum: ObjectTypeEnum,
    nullable: true,
  })
  type: string;

  @Column({ nullable: true })
  catalog: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  map: string;

  @ManyToMany(() => Photo, (photo) => photo.spaceObjects)
  photos: Photo[];

  @ManyToMany(() => Post, (post) => post.spaceObjects)
  posts: Post[];
}
