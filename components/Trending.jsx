import { DotsHorizontalIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

function Trending() {
  return (
    <>
      <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-[#6e767d] text-xs font-medium">Porfolio</p>
          <h6 className="font-bold max-w-[250px] text-sm ">
            My own Personal Portfolio, you can find more projects and my journey as a Frontend Developer
          </h6>
          <Link href={"https://cesars-portfolio.vercel.app"} target={"_blank"}>
            <p className="text-[#6e767d] text-xs font-medium max-w-[250px] mt-2">
              {" "}
              <span className="tag">Take me there ➡!</span>
            </p>
          </Link>
        </div>
        <div className="icon group">
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      </div>
      <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-[#6e767d] text-xs font-medium">Comflix</p>
          <h6 className="font-bold max-w-[250px] text-sm ">
            A movie Search website where users can look for movie
            recomnendations!
          </h6>
          <Link href={"https://comflix.vercel.app"} target={"_blank"}>
            <p className="text-[#6e767d] text-xs font-medium max-w-[250px] mt-2">
              {" "}
              <span className="tag">Take me there ➡!</span>
            </p>
          </Link>
        </div>
        <div className="icon group">
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      </div>
      <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-[#6e767d] text-xs font-medium">Library</p>
          <h6 className="font-bold max-w-[250px] text-sm ">
            A website for someone that loves books, or if you're just looking for recomnendations!
          </h6>
          <Link href={"https://react-library-chi.vercel.app"} target={"_blank"}>
            <p className="text-[#6e767d] text-xs font-medium max-w-[250px] mt-2">
              {" "}
              <span className="tag">Take me there ➡!</span>
            </p>
          </Link>
        </div>
        <div className="icon group">
          <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      </div>
    </>
  );
}

export default Trending;
