import { Stack, chakra, Image, Link, Text } from "@chakra-ui/react";
import { observer } from "mobx-react";
import Head from "next/head";

const Page404 = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <chakra.main>
        <Stack
          backgroundColor="#202A3B"
          justifyContent={"center"}
          alignItems={"center"}
          h="100vh"
          gap={4}
        >
          <Image
            src="/assets/404.png"
            alt="404"
            width={404}
            objectFit="cover"
            objectPosition="center"
          />

          <Link href="/" color="white">
            <Text fontSize="2xl" fontWeight="bold">
              Go back home
            </Text>
          </Link>
        </Stack>
      </chakra.main>
    </>
  );
};

export default observer(Page404);
