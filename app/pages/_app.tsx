import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import {
  ClientToServerEvents,
  Navbar,
  ServerToClientEvents,
} from '../components';
import { io, Socket } from 'socket.io-client';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar></Navbar>
      <Component {...pageProps} socket={socket} />
    </div>
  );
}

export default MyApp;
