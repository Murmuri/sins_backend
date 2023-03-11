import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Camera } from './Camera';
import { Equipment } from './Equipment';
import { Photo } from './Photo';
import { Telescope } from './Telescope';
import { User } from './User';
import { Location } from './Location';
import { SpaceObject } from './SpaceObject';

@Entity({ name: 'posts' })
export class Post {
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
  title: string;

  @ManyToOne(() => Photo, (photo) => photo.titlePosts)
  titlePhoto: Photo;

  @Column({ nullable: true })
  discription: string;

  @Column({ nullable: true })
  start_at: Date;

  @Column({ nullable: true })
  end_at: Date;

  @Column({ nullable: true })
  weather: string;

  @Column({ nullable: true })
  plane: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Photo, (photo) => photo.posts)
  photos: Photo[];

  @ManyToMany(() => Camera, (camera) => camera.posts)
  camers: Camera[];

  @ManyToMany(() => Equipment, (equipment) => equipment.posts)
  equipments: Equipment[];

  @ManyToOne(() => Location, (location) => location.posts)
  location: Location;

  @ManyToMany(() => Telescope, (telescope) => telescope.posts)
  telescopes: Telescope[];

  @ManyToMany(() => SpaceObject, (spaceObject) => spaceObject.posts)
  spaceObjects: SpaceObject[];
}
