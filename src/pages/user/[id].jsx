import Head from "next/head";
import Sidebar from "components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "components/Login";
import Modal from "components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "/atoms/modalAtom";
import Widgets from "components/Widgets";
import Profile from "components/Profile";


import { modalTweetState } from "atoms/modalAtom";
import TweetModal from "components/TweetModal";

function User({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [isTweetOpen, setIsTweetOpen] = useRecoilState(modalTweetState);

  if (!session) return <Login providers={providers} />;

  return (
    <>
      <Head>
        <title>{session?.user?.name} Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-twitter.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Profile user={session?.user} />
        <Widgets trendingResults={trendingResults} followResults={followResults}/>

        {isOpen && <Modal />}
        {isTweetOpen && <TweetModal />}
      </main>
    </>
  );
}

export default User;

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}