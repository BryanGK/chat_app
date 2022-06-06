import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import next from 'next';
import http from 'http';
import { Message } from './components';
import { AppDataSource } from './database/data-source';
import { UserEntity } from './database/entity/UserEntity';
import { MessageEntity } from './database/entity/MessageEntity';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST;
const port: number = (process.env.PORT as unknown as number) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get('/api/messages', async (req: Request, res: Response) => {
    AppDataSource.initialize()
      .then(async () => {
        const messagesRepository = AppDataSource.getRepository(MessageEntity);
        const allMessages = await messagesRepository.find();
        res.send(allMessages);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        AppDataSource.destroy();
      });
  });

  server.post('/api/messages', (req: Request, res: Response) => {
    AppDataSource.initialize()
      .then(async () => {
        const message = new MessageEntity();
        message.message = req.body.message;
        message.author = req.body.author;

        await AppDataSource.manager.save(message);
        res.send(message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        AppDataSource.destroy();
      });
  });

  server.all('*', async (req, res) => handle(req, res));

  http
    .createServer(server)
    .listen(port, () => {
      console.log(`> Server ready on http://localhost:${port}`);
    })
    .on('error', (err) => {
      console.log(err);
    });
});
