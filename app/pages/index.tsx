import { response } from 'express';
import { data } from 'jquery';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  UsersTable,
  MessagesTable,
  MessageInput,
  User,
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
} from '../components';
import { io, Socket } from 'socket.io-client';

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([{ id: 1234, username: 'Bryan' }]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newMessage = [...messages];
    newMessage.push({
      id: messages.length + 1,
      message: messageInputValue,
      author: users[0].username,
    });
    setMessages(newMessage);
    setMessageInputValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInputValue(e.target.value);
  };

  useEffect(() => {
    const connectSocket = () => {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
      socket.on('connect', () => {
        console.log('Connected with: ', socket.id);
      });
    };
    const fetchMessages = () => {
      fetch(`http://localhost:3000/api/messages`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          const newMessage: Array<Message> = data;
          setMessages(newMessage);
        });
    };
    connectSocket();
    fetchMessages();
  }, []);

  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat app by BryanGK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="main">
          <h1>Chat App</h1>
          <div className="msg-main">
            <div className="display">
              <UsersTable users={users} />
              <MessagesTable messages={messages} />
            </div>
            <MessageInput
              onClick={onClick}
              onChange={handleChange}
              messageInputValue={messageInputValue}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
