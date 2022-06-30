import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
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

interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

// TO-DO:

// assign colours to user messages
// better look and feel to UI
// Containerize?
// Deploy

const Home: React.FC<Props> = ({ socket }) => {
  const [user, setUser] = useState<User>();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [userInputValue, setUserInputValue] = useState<string>('');
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [modalState, setModalState] = useState(false);
  const [createUserState, setCreateUserState] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');

  const postMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;
    e.preventDefault();
    const messageData: Message = {
      message: messageInputValue,
      author: user.username,
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
        socket.emit('savedMessage', messageData);
      })
      .catch((error) => {
        console.error('Error sending message: ', error);
      });
    setMessageInputValue('');
  };

  const createUser = () => {
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
        setUser({
          ...data,
        });
        toggleModal();
        socket.emit('connectedUser', { ...data });
      })
      .then(() => {
        fetchMessages();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const logout = () => {
    fetch(`http://localhost:3000/api/logout`).then(() => {
      window.location.reload();
    });
  };

  const toggleCreateUserState = () => setCreateUserState(!createUserState);
  const toggleModal = () => setModalState(!modalState);

  const handleMessage = (msg: Message) => {
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

  const fetchMessages = () => {
    fetch(`http://localhost:3000/api/messages`, {
      method: 'GET',
      headers: {},
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        const newMessage: Array<Message> = data;
        setMessages(newMessage);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUser = () => {
    fetch(`http://localhost:3000/api/user`, {
      method: 'GET',
    })
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const data: User[] = await response.json();
        setUser({
          ...data[0],
        });
      })
      .then(() => {
        fetchMessages();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchMessages();

    socket.on('returnMessage', (msg) => {
      handleMessage(msg);
    });

    socket.on('returnConnectedUsers', (users) => {
      setActiveUsers([...users]);
    });
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
            modalState={modalState}
            toggleModal={toggleModal}
            createUserState={createUserState}
            login={login}
            logout={logout}
            createUser={createUser}
            handleUserInputChange={handleUserInputChange}
            handlePasswordInputChange={handlePasswordInputChange}
          />
          <div className="msg-main">
            <div className="display">
              <UsersTable user={user} activeUsers={activeUsers} />
              <MessagesTable messages={messages} user={user} />
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

export const getServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default Home;
