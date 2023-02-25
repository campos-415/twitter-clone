import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
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
import EmojiPicker, { Picker } from "@emoji-mart/react";

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
        console.log(postId);
        console.log(snapshot.data());
      }),
    [postId]
  );

  // function to add emoji to input field
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      id: session.user.uid,
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

    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
    setIsOpen(false);
    setComment("");

    router.push(`/${postId}`);
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
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
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
              className={`inline-block align-bottom bg-black rounded-2xl ${showEmojis && "h-[750px]"} text-left overflow-hidden 
            shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full`}>
              <div className="flex w-full items-center px-1.5 pt-2 ">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                  onClick={() => setIsOpen(false)}>
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex items-start justify-start w-full  px-4 pt- pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    <img
                      src={post?.userImg}
                      alt="userImg"
                      className="h-11 w-11 rounded-full"
                    />
                    <div>
                      <div className="inline-block group">
                        <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                          {post?.username}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}{" "}
                        </span>
                      </div>{" "}
                      ·{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full">
                    <img
                      src={session?.user.image}
                      alt="userImg"
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows="2"
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
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
                                <EmojiPicker
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
                            onClick={sendComment}>
                            Tweet
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
