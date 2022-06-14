import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import next from 'next';
import { createServer } from 'http';
import cors from 'cors';
import apiRouter from './routes';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './components';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST;
const port: number = (process.env.PORT as unknown as number) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.use(cors());

  server.use('/api', apiRouter);

  server.all('*', async (req: Request, res: Response) => handle(req, res));

  const httpServer = createServer(server);

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  io.on('connect', (socket) => {
    console.log(socket.id);
    socket.on('savedMessage', (msg) => {
      console.log('returnMessage');
      io.emit('returnMessage', msg);
    });
  });

  httpServer
    .listen(port, () => {
      console.log(`\n> Server ready on http://localhost:${port}\n`);
    })
    .on('error', (error: Error) => {
      console.error('\nError starting the server: ', error, '\n');
    });
});
