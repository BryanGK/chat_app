import { DataSource } from 'typeorm';
import { UserEntity } from './entity/UserEntity';
import { MessageEntity } from './entity/MessageEntity';

const AppDataSource = new DataSource({
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

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log(error));

export default AppDataSource;
