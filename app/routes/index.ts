import express from 'express';
import { Request, Response } from 'express';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';
import {
  getData,
  getUserById,
  postMessage,
  postUser,
} from '../services/databaseService';

const apiRouter = express();

apiRouter.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await getData(MessageEntity);
    res.send(messages);
  } catch (error) {
    res.send(`Error getting messages: ${error}`);
  }
});

apiRouter.post('/messages', async (req: Request, res: Response) => {
  try {
    const message = await postMessage(req.body);
    res.send(message);
  } catch (error) {
    console.error(`Error saving message: ${error}`);
  }
});

apiRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await getData(UserEntity);
    res.send(users);
  } catch (error) {
    res.send(`Error getting messages: ${error}`);
  }
});

apiRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await postUser(req.body);
    res.send(user);
  } catch (error) {
    console.error(`Error saving user: ${error}`);
  }
});

apiRouter.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    res.send(user);
  } catch (error) {
    console.error(`Error saving user: ${error}`);
  }
});

export default apiRouter;
