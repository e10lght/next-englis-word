import { GetServerSideProps } from "next";
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

type SSRProps = {
  result: Words[];
};

const Choice = (props: SSRProps) => {
  const { result } = props;
  const [sectionWordList, setSectionWordList] = useRecoilState(wordListState);
  const router = useRouter();
  const keyword = Array.isArray(router.query.keyword)
    ? router.query.keyword[0]
    : router.query.keyword;

  useEffect(() => {
    setSectionWordList(result);
  }, [keyword]);
  return (
    <>
      <div>Choice</div>
      <Link href={{ pathname: "/questions", query: { id: 0 } }}>
        <br />
        <a>出題ページ</a>
      </Link>
      <Link href={{ pathname: "/itemlist" }}>
        <br />
        <a>単語一覧</a>
      </Link>
      <Link href={{ pathname: "/review" }}>
        <br />
        <a>復習ページへ</a>
      </Link>
    </>
  );
};

// getServerSidePropsはページへのリクエストがある度に実行される
export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  console.log(context.resolvedUrl);

  const query = context.query.keyword;
  const keyword = Array.isArray(query) ? query[0] : query;
  const { data: resultWordList, error: wordListError } = await supabase
    .from("wordlist")
    .select()
    .eq("section_id", keyword);
  const result = resultWordList as Words[];

  return {
    props: {
      result,
    },
  };
};

export default Choice;
