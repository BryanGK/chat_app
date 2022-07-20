import { MessageEntity } from '../database/entity/MessageEntity';

export interface User {
  id: string | null;
  username: string;
  password: string;
  authToken?: string;
  socketId?: string;
  createdAt?: string;
}

export interface Message {
  id: string | null;
  message: string;
  author: string;
  authorId: string | null;
  createdAt?: string;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  returnMessage: (msg: MessageEntity) => void;
  returnConnectedUsers: (users: Array<User>) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  savedMessage: (msg: MessageEntity) => void;
  connectedUser: (user: User) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
