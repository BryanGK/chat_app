import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { UsersTable, MessagesTable, MessageInput } from '../components';

interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  message: string;
  author: string;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1234', username: 'Bryan' },
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newMessage = [...messages];
    newMessage.push({
      id: (messages.length + 1).toString(),
      message: messageInputValue,
      author: users[0].username,
    });
    setMessages(newMessage);
    setMessageInputValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInputValue(e.target.value);
  };

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
