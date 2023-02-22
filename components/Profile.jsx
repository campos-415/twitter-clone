import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Post from "./Post";

function Profile({ user, userPosts }) {
  const router = useRouter();

  return (
    <div className="flex-grow border-l border-r border-gray-700 mx-w-2xl sm:ml-[72px] xl:ml-[370px]">
      <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => router.push(`/`)}>
          <ArrowLeftIcon className="h-5 text-white" />
        </div>
        <h4 className="text-lg font-bold">{user.name}</h4>
      </div>
      <div className="pb-72">
        {userPosts?.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
