import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
})
export const modalTweetState = atom({
  key: "modalTweetState",
  default: false,
})

export const postIdState = atom({
  key: "postIdState",
  default: "",
})

export const userPosts = atom({
  key: "userPosts",
  default: [],
})