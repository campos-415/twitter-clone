import { ArrowCircleLeftIcon, DotsHorizontalIcon, SparklesIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { signOut, useSession } from "next-auth/react";
import {useRouter} from "next/router";

function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const router = useRouter()

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  useEffect(() => {
    setUserId(session?.user?.uid);
  }, [db]);


  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <div
          className="xl:hidden md:hidden sm:hidden text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation"
          onClick={() => router.push(`/user/${userId}`)}
          >
          <img
            src="https://rb.gy/ogau5a"
            className="h-7 w-7 rounded-full xl:mr-2.5"
            alt="userImg"
          />
        </div>
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ">
          <SparklesIcon className="hidden h-5 text-white sm:inline" />
          <ArrowCircleLeftIcon className="h-7 text-white sm:hidden md:hidden lg:hidden xl:hidden" onClick={signOut}/>
        </div>
      </div>

      <Input />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;