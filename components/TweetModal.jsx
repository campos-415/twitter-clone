import { useRecoilState } from "recoil";
import { modalTweetState, showEmoji } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import Input from "./Input";

function TweetModal() {
  const [isTweetOpen, setIsTweetOpen] = useRecoilState(modalTweetState);
  const [showEmojis, setShowEmojis] = useRecoilState(showEmoji);

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
              className={` ${
                showEmojis && "h-[750px]"
              } inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden 
              shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full`}>
              <div className="flex w-full items-center px-1.5 pt-2 ">
                <div
                  className="hoverAnimation w-9 h-9 flex items-center justify-center my-3 xl:px-0"
                  onClick={() => setIsTweetOpen(false)}>
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>
              <Input />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default TweetModal;
