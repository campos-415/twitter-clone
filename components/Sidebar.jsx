import React, { useEffect, useState } from "react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import Link from "next/link";
import { modalTweetState, postIdState } from "atoms/modalAtom";

function Sidebar() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState();
  const [postId, setPostId] = useRecoilState(postIdState);
  const [isTweetOpen, setIsTweetOpen] = useRecoilState(modalTweetState);
  const router = useRouter();

  useEffect(() => {
    setUserId(session?.user?.uid);
  }, []);

  return (
    <div
      className="hidden sm:flex flex-col 
    items-center xl:items-start xl:w-[340px]
    p-2 fixed h-full">
      <div
        className="flex items-center 
      justify-center w-14 h-14 hoverAnimation 
      p-0 xl:ml-24">
        <Link href="/">
          <Image
            src="https://rb.gy/ogau5a"
            width={30}
            height={30}
            alt="LogoImg"
          />
        </Link>
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <Link href="/">
          <SidebarLink text="Home" Icon={HomeIcon} active />
        </Link>
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <div onClick={() => router.push(`/user/${session.user.uid}`)}>
          <SidebarLink text="Profile" Icon={UserIcon} />
        </div>
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
        <div onClick={signOut}>
          <SidebarLink text="Sign Out" Icon={ArrowCircleLeftIcon} />
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setPostId(userId);
          setIsTweetOpen(true);
        }}
        className="hidden xl:inline ml-auto bg-[#1d9bf0] text-[#d9d9d9]
      rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] mt-5">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAnimation ml-auto xl:-mr-5"
        onClick={() => router.push(`/user/settings/`)}>
        <img
          src={session?.user?.image}
          className="h-10 w-10 rounded-full xl:mr-2.5"
          alt="userImg"
        />
        <div className="hidden xl:inline leading-5 ">
          <h4 className="font-bold text-sm">{session?.user?.name}</h4>
          <p className="text-[#6e767d] ">@{session?.user?.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
}

export default Sidebar;
