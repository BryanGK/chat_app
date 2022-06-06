import express from 'express';
import { AppDataSource } from '../database/data-source';
import { Request, Response } from 'express';
import { MessageEntity } from '../database/entity/MessageEntity';
import { UserEntity } from '../database/entity/UserEntity';

const apiRouter = express();

apiRouter.get('/messages', (req: Request, res: Response) => {
  AppDataSource.initialize()
    .then(async () => {
      const messagesRepository = AppDataSource.getRepository(MessageEntity);
      const allMessages = await messagesRepository.find();
      res.send(allMessages);
    })
    .catch((error: Error) => {
      console.error('\nError getting your messages:', error, '\n');
    })
    .finally(() => {
      AppDataSource.destroy();
    });
});

apiRouter.post('/messages', (req: Request, res: Response) => {
  AppDataSource.initialize()
    .then(async () => {
      const message = new MessageEntity();
      message.message = req.body.message;
      message.author = req.body.author;

      await AppDataSource.manager.save(message);
      res.send(message);
    })
    .catch((error: Error) => {
      console.error('Error saving your message: ', error, '\n');
    })
    .finally(() => {
      AppDataSource.destroy();
    });
});

apiRouter.get('/users', (req: Request, res: Response) => {
  AppDataSource.initialize()
    .then(async () => {
      const usersRepository = AppDataSource.getRepository(UserEntity);
      const allUsers = await usersRepository.find();
      res.send(allUsers);
    })
    .catch((error: Error) => {
      console.error('Error getting users: ', error, '\n');
    })
    .finally(() => {
      AppDataSource.destroy();
    });
});

apiRouter.post('/user', (req: Request, res: Response) => {
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

apiRouter.get('/user/:id', (req: Request, res: Response) => {
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
