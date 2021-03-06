import Head from 'next/head';
import Image from 'next/image';
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
import LoginModal from '../components/LoginModal';
import { getFetch, postFetch } from '../utils/fetch';
import { MessageEntity } from '../database/entity/MessageEntity';

interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const Home: React.FC<Props> = ({ socket }) => {
  const [user, setUser] = useState<User>();
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [userInputValue, setUserInputValue] = useState<string>('');
  const [passwordInputValue, setPasswordInputValue] = useState<string>('');
  const [modalState, setModalState] = useState(false);
  const [createUserState, setCreateUserState] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInputValue, setMessageInputValue] = useState<string>('');
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(() => {
    fetchUser();

    socket.on('returnMessage', (msg) => {
      handleMessage(msg);
    });

    socket.on('returnConnectedUsers', (users) => {
      setActiveUsers([...users]);
    });
  }, []);

  const postMessage = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (!user) return;
    e.preventDefault();
    const messageData: Message = {
      message: messageInputValue,
      author: user.username,
      authorId: user.id,
      id: null,
    };
    console.log(messageData);
    postFetch('http://localhost:3000/api/messages', messageData)
      .then(() => {
        socket.emit('savedMessage', messageData as MessageEntity);
        setMessageInputValue('');
      })
      .catch((e) => {
        console.error('Error sending message: ', e);
      });
  };

  const createUser = () => {
    const user: User = {
      username: userInputValue,
      password: passwordInputValue,
      id: null,
    };
    if (createUserState) {
      postFetch('http://localhost:3000/api/users', user)
        .then(() => {
          setCreateUserState(false);
          login();
        })
        .catch((e) => {
          setIsExistingUser(true);
          console.error('create user error: ', e);
        });
    }
  };

  const login = () => {
    const user: User = {
      username: userInputValue,
      password: passwordInputValue,
      id: null,
    };
    postFetch('http://localhost:3000/api/login', user)
      .then((res) => {
        setUser({ ...res });
        socket.emit('connectedUser', { ...res });
        toggleModal();
        fetchUser();
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

  const fetchMessages = () => {
    getFetch('http://localhost:3000/api/messages')
      .then((res: Array<Message>) => {
        setMessages(res);
      })
      .catch((e) => {
        console.error('Error fetching messages ', e);
      });
  };

  const fetchUser = () => {
    getFetch('http://localhost:3000/api/user')
      .then((res: Array<User>) => {
        setUser({
          ...res[0],
        });
      })
      .then(() => {
        fetchMessages();
      })
      .catch((e) => {
        setModalState(true);
        console.error('Logged in user not found:\n', e);
      });
  };

  const handleMessage = (msg: Message) => {
    setMessages((prevState) => [
      ...prevState,
      {
        message: msg.message,
        author: msg.author,
        authorId: msg.authorId,
        id: (prevState.length + 1).toString(),
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

  return (
    <div>
      <Head>
        <title>yu | chat</title>
        <meta name="description" content="Chat app by BryanGK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="main">
          <header className="main-header">
            <Image
              className="header-image"
              src="/discussion.png"
              alt="Chat app logo"
              width="100"
              height="80"
            />
            <h1 className="header-h1">yu | chat</h1>
          </header>
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
          <div>
            <LoginModal
              isExistingUser={isExistingUser}
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
