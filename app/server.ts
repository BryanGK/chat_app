import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import next from 'next';
import http from 'http';
import { Message } from './components';
import { AppDataSource } from './database/data-source';
import { UserEntity } from './database/entity/UserEntity';
import { MessageEntity } from './database/entity/MessageEntity';
import apiRouter from './routes';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST;
const port: number = (process.env.PORT as unknown as number) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.use('/api', apiRouter);

  server.all('*', async (req: Request, res: Response) => handle(req, res));

  http
    .createServer(server)
    .listen(port, () => {
      console.log(`\n> Server ready on http://localhost:${port}\n`);
    })
    .on('error', (error: Error) => {
      console.error('\nError starting the server: ', error, '\n');
    });
});
