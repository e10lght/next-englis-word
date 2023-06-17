import { atom } from "recoil";

type Words = {
  id: number;
  created_ad: Date;
  updated_ad: Date;
  word: string;
  example?: string;
  exampleanswer?: string;
  type: string;
  explain: string;
  sectionid: string;
};

export const userState = atom({
  key: "wordlist",
  default: [] as Words[],
});
