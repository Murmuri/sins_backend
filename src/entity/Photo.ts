import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Albome } from './Albome';
import { Camera } from './Camera';
import { Equipment } from './Equipment';
import { User } from './User';
import { Location } from './Location';
import { Telescope } from './Telescope';
import { SpaceObject } from './SpaceObject';
import { Post } from './Post';

@Entity({ name: 'photos' })
export class Photo {
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

  @Column({ nullable: true })
  date: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @ManyToMany(() => Albome, (albome) => albome.photos)
  albomes: Albome[];

  @ManyToOne(() => Camera, (camera) => camera.photos)
  camera: Camera;

  @ManyToMany(() => Equipment, (equipment) => equipment.photos)
  equipments: Equipment[];

  @ManyToOne(() => Location, (location) => location.photos)
  location: Location;

  @ManyToOne(() => Telescope, (telescope) => telescope.photos)
  telescope: Telescope;

  @ManyToMany(() => SpaceObject, (spaceObject) => spaceObject.photos)
  spaceObjects: SpaceObject[];

  @ManyToMany(() => Post, (post) => post.photos)
  posts: Post[];

  @ManyToMany(() => Post, (post) => post.titlePhoto)
  titlePosts: Post[];
}
