import Head from "next/head";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "components/Login";
import Modal from "components/Modal";
import { useRecoilState } from "recoil";
import { modalState, userPosts } from "/atoms/modalAtom";
import Widgets from "components/Widgets";
import Profile from "components/Profile";
import { modalTweetState, user } from "atoms/modalAtom";
import TweetModal from "components/TweetModal";
import Sidebar from "components/Sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "/firebase";

function User({ trendingResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [userPost, setUserPost] = useRecoilState(userPosts);
  const [isTweetOpen, setIsTweetOpen] = useRecoilState(modalTweetState);
  const [users, setUsers] = useState([])
  const router = useRouter()
  const { id } = router.query

  // console.log(id)

  useEffect(() => {
    
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => {
        return {
          id: doc.data().id,
          tag: doc.data().tag,
          userImg: doc.data().userImg,
          username: doc.data().username,
        }
      }))
    })

    return unsubscribe
  },[])


  if (!session) return <Login providers={providers} />;


  return (
    <>
      <Head>
        <title>{userPost.username} Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon-twitter.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Profile user={userPost} />
        <Widgets trendingResults={trendingResults} />

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
  
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      providers,
      session,
    },
  };
}
