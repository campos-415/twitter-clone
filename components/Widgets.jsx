import { SearchIcon } from "@heroicons/react/outline";
import { db } from "/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Trending from "./Trending";
import { useRecoilState } from "recoil";
import { userPosts } from "atoms/modalAtom";

function Widgets({ trendingResults}) {
  const { data: session } = useSession();
  const [users, setUsers] = useState([])
  const [user, setUser] = useRecoilState(userPosts)
  const router = useRouter();
  // console.log(router)

  function getUserId(e, id, res) {
    console.log(id)
    setUser(res)
    if (id === session.user.uid) {
      router.push(`/user/${session.user.uid}`);
    } else {
      router.push(`/users/${id}`);
    }

  }

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

  

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none 
            text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent 
            w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Who to Stalk</h4>
        {users
          ?.filter((obj, index, arr) => {
            return index === arr.findIndex((t) => t.id === obj.id);
          })
          ?.filter((res) => res.id !== session.user.uid)
          ?.map((res, index) => (
            <div
              className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
              key={index}>
              <img
                src={res?.userImg}
                className="h-11 w-11 rounded-full mr-4"
                alt="userImg"
              />
              <div className="ml-4 leading-5 group" onClick={(e) => getUserId(e, res.id, res)} >
                <h4 className="font-bold group-hover:underline">
                  {res?.username}
                </h4>
                <h5 className="text-gray-500 text-[12px]">@{res?.tag}</h5>
              </div>

              <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
                Follow
              </button>
            </div>
          ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
    </div>
  );
}

export default Widgets;
