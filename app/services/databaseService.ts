import AppDataSource from '../database/data-source';
import { EntityTarget } from 'typeorm';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';
import * as bcrypt from 'bcrypt';

export const getData = async (entity: EntityTarget<unknown>) => {
  const messagesRepository = AppDataSource.getRepository(entity);
  return await messagesRepository.find();
};

export const getUserById = async (id: number) => {
  const usersRepository = AppDataSource.getRepository(UserEntity);
  return await usersRepository.findOneBy({
    id: id,
  });
};

export const postMessage = async (input: MessageEntity) => {
  const message = new MessageEntity();
  message.message = input.message;
  message.author = input.author;
  return await AppDataSource.manager.save(message);
};

export const postUser = async (input: UserEntity) => {
  const user = new UserEntity();
  user.username = input.username;
  user.password = await bcrypt.hash(input.password, 10);
  return await AppDataSource.manager.save(user);
};
