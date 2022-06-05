import { Navbar, MessagesTable, UsersTable, MessageInput } from '../components';
import { Button, Input } from 'reactstrap';
import React, { useState } from 'react';

interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  message: string;
  author: string;
}

const Layout: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1234', username: 'Bryan' },
    { id: '2345', username: 'Andy' },
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', message: 'hello world', author: 'Bryan' },
    { id: '2', message: 'hey man!', author: 'Andy' },
    { id: '3', message: 'doing great work!', author: 'Andy' },
  ]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("onClick");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Event: ', e.target.value);
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="main">
        <h1>Chat App</h1>
        <div className="msg-main">
          <div className="display">
            <UsersTable users={users} />
            <MessagesTable messages={messages} />
          </div>
          <MessageInput onClick={onClick} onChange={ handleChange}/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
