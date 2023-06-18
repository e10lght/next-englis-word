import Link from "next/link";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import supabase from "../../utils/supabase";
import { wordListState } from "../store/auth";

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

const Choice = () => {
  const [sectionWordList, setSectionWordList] = useRecoilState(wordListState);

  useEffect(() => {
    const fetchWordList = async () => {
      const { data: resultWordList, error: wordListError } = await supabase
        .from("wordlist")
        .select()
        .eq("section_id", 18);
      const result = resultWordList as Words[];
      console.log(result);
      setSectionWordList(result);
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
      <Link href={{ pathname: "/review" }}>
        <a>復習ページへ</a>
      </Link>
    </>
  );
};

export default Choice;
