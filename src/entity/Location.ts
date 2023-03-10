import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}