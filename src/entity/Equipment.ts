import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './Photo';
import { Post } from './Post';
import { User } from './User';

@Entity({ name: 'equipments' })
export class Equipment {
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

  @ManyToOne(() => User, (user) => user.equipments)
  user: User;

  @ManyToMany(() => Photo, (photo) => photo.equipments)
  photos: Photo[];

  @ManyToMany(() => Post, (post) => post.equipments)
  posts: Post[];
}
