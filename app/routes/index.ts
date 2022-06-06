import express from 'express';
import { AppDataSource } from '../database/data-source';
import { Request, Response } from 'express';
import { MessageEntity } from '../database/entity/MessageEntity';

const apiRouter = express();

apiRouter.get('/messages', async (req: Request, res: Response) => {
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

export default apiRouter;
