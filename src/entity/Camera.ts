import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './Photo';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'camers' })
export class Camera {
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
  type: string;

  @ManyToOne(() => User, (user) => user.camers)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.camera)
  photos: Photo[];

  @ManyToMany(() => Post, (post) => post.camers)
  posts: Post[];
}
