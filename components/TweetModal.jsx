import { useRecoilState } from "recoil";
import { modalState, postIdState, modalTweetState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

import Picker from "@emoji-mart/react";

function TweetModal() {
  const { data: session } = useSession();
  const [isTweetOpen, setIsTweetOpen] = useRecoilState(modalTweetState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();

  // const { data: session } = useSession()

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // function to add emoji to input field
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
    setIsTweetOpen(false)
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };



  return (
    <Transition.Root show={isTweetOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 pt-8"
        onClose={setIsTweetOpen}>
        <div
          className="flex items-start justify-center min-h-[800px] sm:min-h-screen 
        pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              className=" inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden 
              shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex w-full items-center px-1.5 pt-2 ">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => setIsTweetOpen(false)}>
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex items-start justify-start w-full  px-4 pt- pb-2.5 sm:px-6">
                <img
                  className="w-11 h-11 rounded-full cursor-pointer mr-4"
                  src={session.user.image}
                  alt="userImg"
                />
                <div className="w-full">
                  <div
                    className={`${selectedFile && "pb-7"} ${
                      input && "space-y-2.5"
                    }`}>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows="2"
                      placeholder="What's happening?"
                      className="bg-transparent outline-none text-[#d9d9d9] 
                      text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                    />
                    {selectedFile && (
                      <div className="relative">
                        <div
                          className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] 
                          bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 
                          cursor-pointer"
                          onClick={() => setSelectedFile(null)}>
                          <XIcon className="text-white h-5" />
                        </div>
                        <img
                          src={selectedFile}
                          alt="userImg"
                          className="rounded-2xl max-h-80 object-contain"
                        />
                      </div>
                    )}
                  </div>
                  {!loading && (
                    <div className="flex items-center justify-between pt-2.5">
                      <div className="flex items-center">
                        <div
                          className="icon"
                          onClick={() => filePickerRef.current.click()}>
                          <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                          <input
                            type="file"
                            ref={filePickerRef}
                            hidden
                            onChange={addImageToPost}
                          />
                        </div>

                        <div className="icon rotate-90">
                          <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        <div
                          className="icon"
                          onClick={() => setShowEmojis(!showEmojis)}>
                          <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        <div className="icon">
                          <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

                        {showEmojis && (
                          <div className="-ml-9 absolute mt-[465px] xl:ml-0 ">
                            <Picker
                              onEmojiSelect={addEmoji}
                              theme="lightdark"
                            />
                          </div>
                        )}
                      </div>
                      <button
                        className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 
                        font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] 
                        disabled:opacity-50 disabled:cursor-default"
                        disabled={!input.trim() && !selectedFile}
                        onClick={sendPost} >
                        Tweet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default TweetModal;
