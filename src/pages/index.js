import Head from "next/head";
import Sidebar from "components/Sidebar";
import Feed from "components/Feed";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "components/Login";
import Modal from "components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "/atoms/modalAtom";
import Widgets from "components/Widgets";
import { modalTweetState, user } from "atoms/modalAtom";
import TweetModal from "components/TweetModal";


export default function Home({providers}) {

  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isTweetOpen, setIsTweetOpen] = useRecoilState(modalTweetState);

  if (!session) return <Login providers={providers} />
  
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-twitter.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed /> 
        <Widgets />

        {isOpen && <Modal />}
        {isTweetOpen && <TweetModal />}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}