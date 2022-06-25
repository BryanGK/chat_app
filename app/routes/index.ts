import express from 'express';
import { Request, Response } from 'express';
import { Message, User } from '../components';
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
import dotenv from 'dotenv';
dotenv.config();

const apiRouter = express();

apiRouter.get(
  '/messages',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const messages = await getData('Messages');
      res.send(messages);
    } catch (error) {
      res.sendStatus(500).send(`Error getting messages: ${error}`);
      res.send(`Error getting messages: ${error}`);
    }
  }
);

apiRouter.post(
  '/messages',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const message = await postMessage(req.body);
      res.send(message);
    } catch (error) {
      res.sendStatus(500).send(`Error getting messages: ${error}`);
      console.error(`Error saving message: ${error}`);
    }
  }
);

apiRouter.get(
  '/user',
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const user = await getData('User', req.body.user);
      res.send(user);
    } catch (error) {
      res.sendStatus(500).send(`Error getting users: ${error}`);
      res.send(`Error getting users: ${error}`);
    }
  }
);

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
    .then((authorizedUser) => {
      res
        .cookie('access_token', authorizedUser.authToken, {
          maxAge: 900000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .send(JSON.stringify(authorizedUser));
    })
    .catch((error) => {
      if (error.message.startsWith('User')) res.status(404).send(error.message);
      else res.status(403).send(error.message);
    });
});

apiRouter.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('access_token');
  res.redirect('/');
});

export default apiRouter;
