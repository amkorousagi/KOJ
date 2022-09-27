import { atom } from "recoil";
export const isLoginedState = atom({
  key: "isLoginedState",
  default: false,
});
export const userTypeState = atom({
  key: "userTypeState",
  default: "student",
});
