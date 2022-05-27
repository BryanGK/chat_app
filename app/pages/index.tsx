import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat app by BryanGK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout></Layout>
      </main>
    </div>
  );
};

export default Home;
