import Head from "next/head";
import Header from "components/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/landing/page");
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default Home;
