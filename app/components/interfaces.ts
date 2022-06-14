import { MessageEntity } from '../database/entity/MessageEntity';

export interface User {
  id: number;
  username: string;
}

export interface Message {
  id: number | null | undefined;
  message: string;
  author: string;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  returnMessage: (msg: MessageEntity) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  savedMessage: (msg: MessageEntity) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
