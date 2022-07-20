import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../components';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 100 })
  username!: string;

  @Column('varchar', { length: 255 })
  password!: string;

  @CreateDateColumn()
  createdAt?: string | undefined;
}
