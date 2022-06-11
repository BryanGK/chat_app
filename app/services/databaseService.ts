import AppDataSource from '../database/data-source';
import { EntityTarget } from 'typeorm';
import { MessageEntity } from '../database/entity/MessageEntity';

export const getData = async (entity: EntityTarget<unknown>) => {
  const messagesRepository = AppDataSource.getRepository(entity);
  return await messagesRepository.find();
};

export const postMessage = async (input: MessageEntity) => {
  const message = new MessageEntity();
  message.message = input.message;
  message.author = input.author;
  return await AppDataSource.manager.save(message);
};
