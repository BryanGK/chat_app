import AppDataSource from '../database/data-source';
import { EntityTarget } from 'typeorm';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';
import * as bcrypt from 'bcrypt';
import { Message, User } from '../components';
import jwt from 'jsonwebtoken';
import authenticateUser from './authService';

export const getData = async (entity: 'User' | 'Messages', userReq?: User) => {
  if (entity === 'User' && userReq) {
    const messagesRepository = AppDataSource.getRepository(UserEntity);
    const users = (await messagesRepository.find()) as Array<User>;
    return users.filter((dbUser) => dbUser.id === userReq.id);
  }
  if (entity === 'Messages') {
    const messagesRepository = AppDataSource.getRepository(MessageEntity);
    return (await messagesRepository.find()) as Array<Message>;
  }
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
  const isAlreadyRegistered = await findUser(input);
  try {
    if (isAlreadyRegistered === null) {
      const user = new UserEntity();
      user.username = input.username;
      user.password = await bcrypt.hash(input.password, 10);
      return await AppDataSource.manager.save(user);
    }
  } catch {
    throw new Error('Username already exists');
  }
};

export const login = async (input: User) => {
  const user = await findUser(input);
  if (!user) throw new Error('User not found');
  const authenticatedUser = await authenticateUser(input, user);
  return authenticatedUser;
};

export const findUser = async (input: User) => {
  const usersRepository = AppDataSource.getRepository(UserEntity);
  return await usersRepository.findOneBy({
    username: input.username,
  });
};
