import Head from 'next/head';
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
import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
}

const Home: React.FC<Props> = ({socket}) => {
  const [users, setUsers] = useState<User[]>([{ id: 1234, username: 'Bryan' }]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const messageData: Message = {
      message: messageInputValue,
      author: users[0].username,
      id: undefined,
    };
    fetch(`http://localhost:3000/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    })
      .then(() => {
        console.log(`message sent: ${messageData}`);
        socket.emit('savedMessage', messageData);
      })
      .catch((error) => {
        console.error('Error sending message: ' + error);
      });
    setMessageInputValue('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInputValue(e.target.value);
  };

  useEffect(() => {
    const connectSocket = () => {
      socket.on('connect', () => {
        socket.on('database', () => {});
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
