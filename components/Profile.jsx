import { ArrowLeftIcon } from "@heroicons/react/outline";
import { db } from "/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "./Input";
import Post from "./Post";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userPosts } from "atoms/modalAtom";

function Profile({ user}) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const [userData, setUserData] = useRecoilState(userPosts)
  const [isOpen, setIsOpen] = useState(false)
  const { id } = router.query



  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          where("id", "==", id),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db, router]
  )

  function showInput() {
    if (id !== session.user.uid) {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    showInput()
  })
  return (
    <>
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[72px] xl:ml-[370px]">
        <div className="flex items-center px-1.5 py-2  text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
          <div
            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
            onClick={() => router.push(`/`)}>
            <ArrowLeftIcon className="h-5 text-white" />
          </div>
          <h4 className="text-lg font-bold">{user?.name || user?.username}</h4>
        </div>
        <div className=" flex flex-col relative max-w-2xl border-b border-gray-700">
          <div className="">
            <img src="/backdropImg.jpeg" alt="" />
            <img
              src={user?.userImg || user?.image}
              className="rounded-full w-[150px] border-[6px] border-black absolute top-[150px] left-[2%]"
              alt=""
            />
          </div>
          <div className="flex flex-col pb-8 pt-[150px] ml-4 xl:pt-[100px]">
            <h3 className="text-[24px] text-white font-bold ">
              {user?.name || user?.username}
            </h3>
            <h4 className="text-[16px] text-[#d9d9d97f]">@{user?.tag}</h4>
          </div>
          <div className="text-white mb-3">
            <p className="ml-4 text-sm">💻 📷</p>
          </div>
          <div className="pb-11 text-[#d9d9d97f] flex flex-wrap text-left text-sm max-w-[85%]  ml-4 ">
            <p className="pb-2 text-left mr-3">📷 Photographer</p>
            <p className="pb-2 text-left mr-3">📍 San Francisco, CA</p>
            <p className="pb-2 text-left mr-3">🎈 Born May 9, 1998</p>
            <p className="pb-2 text-left mr-3">🗓️ Join September 2014</p>
          </div>
        </div>

        <div>{!isOpen && <Input />}</div>
        <div className="pb-72">
          {posts?.map((post) => (
            <Post key={post?.id} id={post?.id} post={post?.data()} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
