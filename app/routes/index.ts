import express from 'express';
import AppDataSource from '../database/data-source';
import { Request, Response } from 'express';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';
import { getData, postMessage } from '../services/databaseService';

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
    const returnedMessage = await postMessage(req.body);
    res.send(returnedMessage);
  } catch (error) {
    console.error(`Error saving message: ${error}`);
  }
});

apiRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const messages = await getData(UserEntity);
    res.send(messages);
  } catch (error) {
    res.send(`Error getting messages: ${error}`);
  }
});

apiRouter.post('/users', (req: Request, res: Response) => {
  AppDataSource.initialize()
    .then(async () => {
      const user = new UserEntity();
      user.username = req.body.username;

      await AppDataSource.manager.save(user);
      res.send(user);
    })
    .catch((error: Error) => {
      console.error('Error saving user: ', error, '\n');
    })
    .finally(() => {
      AppDataSource.destroy();
    });
});

apiRouter.get('/users/:id', (req: Request, res: Response) => {
  AppDataSource.initialize()
    .then(async () => {
      const usersRepository = AppDataSource.getRepository(UserEntity);
      const user = await usersRepository.findOneBy({
        id: parseInt(req.params.id),
      });
      res.send(user);
    })
    .catch((error: Error) => {
      console.error('Error finding user: ', error, '\n');
    })
    .finally(() => {
      AppDataSource.destroy();
    });
});

export default apiRouter;
