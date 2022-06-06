import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Message } from '../../components';

@Entity()
export class MessageEntity implements Message {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('varchar', { length: 255 })
  message!: string;

  @Column('varchar', { length: 100 })
  author!: string;
}
