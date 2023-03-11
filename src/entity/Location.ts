import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './Photo';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'locations' })
export class Location {
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
  latitude: number;

  @Column({ nullable: true })
  longitude: number;

  @OneToMany(() => User, (user) => user.location)
  users: User;

  @OneToMany(() => Photo, (photo) => photo.location)
  photos: Photo[];

  @OneToMany(() => Post, (post) => post.location)
  posts: Post[];
}
