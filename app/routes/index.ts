import express from 'express';
import { Request, Response } from 'express';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';
import authenticateToken from '../middleware/authenticateToken';
import {
  getData,
  getUserById,
  postMessage,
  postUser,
  login,
} from '../services/databaseService';

const apiRouter = express();

apiRouter.get(
  '/messages',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const messages = await getData(MessageEntity);
      res.send(messages);
    } catch (error) {
      res.sendStatus(500).send(`Error getting messages: ${error}`);
      res.send(`Error getting messages: ${error}`);
    }
  }
);

apiRouter.post('/messages', async (req: Request, res: Response) => {
  try {
    const message = await postMessage(req.body);
    res.send(message);
  } catch (error) {
    res.sendStatus(500).send(`Error getting messages: ${error}`);
    console.error(`Error saving message: ${error}`);
  }
});

apiRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await getData(UserEntity);
    res.send(users);
  } catch (error) {
    res.sendStatus(500).send(`Error getting users: ${error}`);
    res.send(`Error getting users: ${error}`);
  }
});

apiRouter.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await postUser(req.body);
    res.send(user);
  } catch (error) {
    res.sendStatus(500).send(`Error saving user: ${error}`);
    console.error(`Error saving user: ${error}`);
  }
});

apiRouter.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    res.send(user);
  } catch (error) {
    res.sendStatus(500).send(`Error saving user: ${error}`);
    console.error(`Error saving user: ${error}`);
  }
});

apiRouter.post('/login', (req: Request, res: Response) => {
  login(req.body)
    .then((accessToken) => {
      res.send(JSON.stringify(accessToken));
    })
    .catch((error) => {
      if (error.message.startsWith('User')) res.status(404).send(error.message);
      else res.status(403).send(error.message);
    });
});

export default apiRouter;
