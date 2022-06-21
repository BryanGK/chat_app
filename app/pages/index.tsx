import Head from 'next/head';
import React, { useEffect, useState } from 'react';
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
import { MessageEntity } from '../database/entity/MessageEntity';
import LoginModal from '../components/LoginModal';
import { UserEntity } from '../database/entity/UserEntity';

interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const Home: React.FC<Props> = ({ socket }) => {
  const [users, setUsers] = useState<User[]>([
    { id: 1234, username: 'Bryan', password: '' },
  ]);
  const [userInputValue, setUserInputValue] = useState<string>('');
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [createUserState, setCreateUserState] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

  const postMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiJCcnlhbiIsInBhc3N3b3JkIjoiJDJiJDEwJENodDFuTkNJTTVrR1o0eW9ad0s4RHVydEo5LzdTSXRURGFHYy9JNUlQWUV0eHVYT09kZ04uIn0.cOq9YMgCC8PMmS5bnbOSZ-z7RIgG3_VS7t1bMXBahPk',
      },
      body: JSON.stringify(messageData),
    })
      .then(() => {
        socket.emit('savedMessage', messageData);
      })
      .catch((error) => {
        console.error('Error sending message: ', error);
      });
    setMessageInputValue('');
  };

  const createUser = async () => {
    const user: User = {
      id: undefined,
      username: userInputValue,
      password: passwordInputValue,
    };
    if (createUserState) {
      fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const login = () => {
    const user: User = {
      id: undefined,
      username: userInputValue,
      password: passwordInputValue,
    };
    fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(async (response) => {
        if (response.status !== 200) {
          console.log(response.statusText);
          return response.statusText;
        }
        const data = await response.json();
        console.log('JWT', data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const toggleCreateUserState = () => setCreateUserState(!createUserState);

  const handleMessage = (msg: MessageEntity) => {
    setMessages((prevState) => [
      ...prevState,
      {
        message: msg.message,
        author: msg.author,
        id: prevState.length + 1,
      },
    ]);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInputValue(e.target.value);
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputValue(e.target.value);
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchMessages = () => {
      fetch(`http://localhost:3000/api/messages`, {
        method: 'GET',
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiJCcnlhbiIsInBhc3N3b3JkIjoiJDJiJDEwJENodDFuTkNJTTVrR1o0eW9ad0s4RHVydEo5LzdTSXRURGFHYy9JNUlQWUV0eHVYT09kZ04uIn0.cOq9YMgCC8PMmS5bnbOSZ-z7RIgG3_VS7t1bMXBahPk',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const newMessage: Array<Message> = data;
          setMessages(newMessage);
        })
        .catch((error) => {
          console.error('Error fetching messages: ', error);
        });
    };
    fetchMessages();

    const connectSocket = () => {
      socket.on('connect', () => {
        console.log('Connected with: ', socket.id);
      });
    };

    socket.on('returnMessage', (msg) => {
      handleMessage(msg);
    });

    connectSocket();
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
          <LoginModal
            toggleCreateUserState={toggleCreateUserState}
            createUserState={createUserState}
            login={login}
            createUser={createUser}
            handleUserInputChange={handleUserInputChange}
            handlePasswordInputChange={handlePasswordInputChange}
          />
          <div className="msg-main">
            <div className="display">
              <UsersTable users={users} />
              <MessagesTable messages={messages} />
            </div>
            <MessageInput
              postMessage={postMessage}
              handleMessageChange={handleMessageChange}
              messageInputValue={messageInputValue}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
