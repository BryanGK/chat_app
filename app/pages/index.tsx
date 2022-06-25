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

interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const Home: React.FC<Props> = ({ socket }) => {
  const [user, setUser] = useState<User>();
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
        authorization: `Bearer ${user.authToken}`,
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
          id: data.id,
          username: data.username,
          password: data.password,
          authToken: data.authToken,
        });
        toggleModal();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (user?.authToken) {
      fetchMessages();
    }
  }, [user]);

  const toggleCreateUserState = () => setCreateUserState(!createUserState);
  const toggleModal = () => setModalState(!modalState);

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

  const fetchMessages = () => {
    if (!user) return;
    fetch(`http://localhost:3000/api/messages`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${user.authToken}`,
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
  useEffect(() => {
    // check to see if a user has logged in
    if (user?.authToken) {
      console.log('FetchMessages on []');
      fetchMessages();
    }

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
            modalState={modalState}
            toggleModal={toggleModal}
            createUserState={createUserState}
            login={login}
            createUser={createUser}
            handleUserInputChange={handleUserInputChange}
            handlePasswordInputChange={handlePasswordInputChange}
          />
          <div className="msg-main">
            <div className="display">
              <UsersTable user={user} />
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

export default Home;
