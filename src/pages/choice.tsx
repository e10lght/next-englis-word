import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const keyword = Array.isArray(router.query.keyword)
    ? router.query.keyword[0]
    : router.query.keyword;
  console.log(keyword);

  useEffect(() => {
    const fetchWordList = async (keyword: string) => {
      console.log(keyword);
      if (!keyword) return;
      const { data: resultWordList, error: wordListError } = await supabase
        .from("wordlist")
        .select()
        .eq("section_id", keyword);
      const result = resultWordList as Words[];
      setSectionWordList(result);
    };
    fetchWordList(keyword!);
  }, [keyword]);
  return (
    <>
      <div>Choice</div>
      <Link href={{ pathname: "/questions", query: { id: 0 } }}>
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
