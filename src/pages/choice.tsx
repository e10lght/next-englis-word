import Link from "next/link";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import supabase from "../../utils/supabase";
import { userState } from "../store/auth";

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

const Choice = () => {
  const [userr, setUser] = useRecoilState(userState);

  useEffect(() => {
    const fetchWordList = async () => {
      const { data: resultWordList, error: wordListError } = await supabase
        .from("wordlist")
        .select()
        .eq("sectionid", 18);
      const result = resultWordList as Words[];
      console.log(result);
      setUser(result);
      return resultWordList as Words[];
    };
    fetchWordList();
  }, []);
  return (
    <>
      <div>Choice</div>
      <Link href={{ pathname: "/questions" }}>
        <a>出題ページ</a>
      </Link>
      <Link href={{ pathname: "/itemlist" }}>
        <a>単語一覧</a>
      </Link>
    </>
  );
};

export default Choice;
