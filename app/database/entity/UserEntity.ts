import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../components';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('varchar', { length: 100 })
  username!: string;

  @Column('varchar', { length: 255 })
  password!: string;
}
