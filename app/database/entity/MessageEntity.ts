import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Message } from '../../components';

@Entity()
export class MessageEntity implements Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  message!: string;

  @Column('varchar', { length: 100 })
  author!: string;

  @Column('uuid')
  authorId!: string;

  @CreateDateColumn()
  createdAt?: string | undefined;
}
