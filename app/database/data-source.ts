import { DataSource } from 'typeorm';
import { UserEntity } from './entity/UserEntity';
import { MessageEntity } from './entity/MessageEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'chat_app',
  synchronize: true,
  logging: false,
  entities: [UserEntity, MessageEntity],
  subscribers: [],
  migrations: [],
});
