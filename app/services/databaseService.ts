import AppDataSource from '../database/data-source';
import { EntityTarget } from 'typeorm';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';
import * as bcrypt from 'bcrypt';
import { User } from '../components';
import jwt from 'jsonwebtoken';
import authorizeUser from './authService';

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

export const login = async (input: User) => {
  const usersRepository = AppDataSource.getRepository(UserEntity);
  const user = await usersRepository.findOneBy({
    username: input.username,
  });
  if (!user) throw new Error('User not found');
  const accessToken = await authorizeUser(input, user);
  console.log('accesstoken login fn: ', accessToken);
  return accessToken;
};
