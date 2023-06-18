import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type Words = {
  id: number;
  created_ad: Date;
  updated_ad: Date;
  word: string;
  example?: string;
  exampleanswer?: string;
  type: string;
  explain: string;
  section_id: string;
};

type User = {
  id: number;
  created_at: Date;
  name: string;
  email: string;
  password: string;
};

export const wordListState = atom({
  key: "wordlist",
  default: [] as Words[],
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "user",
  default: {} as User,
  effects_UNSTABLE: [persistAtom],
});
