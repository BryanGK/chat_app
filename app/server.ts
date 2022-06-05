import express from 'express';
import next from 'next';
import http from 'http';
import { Message } from './components';
import AppDataSource from './database/data-source';

const messages: Array<Message> = [
  { id: 1, message: 'Hey whats up?', author: 'Bryan' },
  { id: 2, message: 'Not much you?', author: 'Andy' },
  { id: 3, message: 'Yo dudes', author: 'James' },
];
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST;
const port: number = (process.env.PORT as unknown as number) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/messages', (req, res) => {
    res.send(messages);
    console.log('Message sent: ', messages);
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
