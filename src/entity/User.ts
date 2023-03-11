import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { Albome } from './Albome';
import { Equipment } from './Equipment';
import { Camera } from './Camera';
import { Location } from './Location';
import { Telescope } from './Telescope';
import { Post } from './Post';
import { Photo } from './Photo';

@Entity({ name: 'users' })
export class User {
  @AfterLoad()
  async loadUsername() {
    let fullname = '';

    if (this.firstname) {
      fullname = this.firstname;
    }

    if (this.lastname) {
      const space = fullname ? ' ' : '';
      fullname += space + this.lastname;
    }

    this.username = fullname;
  }

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

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @OneToMany(() => Equipment, (equipment) => equipment.user)
  equipments: Equipment[];

  @ManyToOne(() => Location, (location) => location.users)
  location: Location;

  @OneToMany(() => Albome, (albome) => albome.user)
  albomes: Albome[];

  @OneToMany(() => Camera, (camera) => camera.user)
  camers: Camera[];

  @OneToMany(() => Telescope, (telescope) => telescope.user)
  telescopes: Telescope[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
