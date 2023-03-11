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
import { User } from './User';

@Entity({ name: 'albomes' })
export class Albome {
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
  tag: string;

  @ManyToOne(() => User, (user) => user.albomes)
  user: User;

  @ManyToMany(() => Photo, (photo) => photo.albomes)
  photos: Photo[];
}
