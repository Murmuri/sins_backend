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

@Entity({ name: 'telescopes' })
export class Telescope {
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

  @Column({ nullable: true })
  focal_length: string;

  @Column({ nullable: true })
  aperture: string;

  @ManyToOne(() => User, (user) => user.telescopes)
  user: User;

  @OneToMany(() => Photo, (photo) => photo.telescope)
  photos: Photo[];

  @ManyToMany(() => Post, (post) => post.telescopes)
  posts: Post[];
}
