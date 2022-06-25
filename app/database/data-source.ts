import { DataSource } from 'typeorm';
import { UserEntity } from './entity/UserEntity';
import { MessageEntity } from './entity/MessageEntity';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
