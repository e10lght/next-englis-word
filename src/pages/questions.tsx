import Head from "next/head";
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import json from "../json/sample.json";
import { useRecoilState, useRecoilValue } from "recoil";
import { wordListState } from "@/store/auth";
import { useRouter } from "next/router";
import e from "express";

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

const Questions = () => {
  const [answer, setAnswer] = useState("");
  const [wordList, setWordList] = useState<Words[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Words>();
  const [removeIds, setRemoveId] = useState<string[]>([]);
  // useRecoilValueで値だけ宣言することも可能
  const sectionWordList = useRecoilValue(wordListState);
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

  useEffect(() => {
    // apiなどからユーザー情報を取得して、setUserでグローバルstateを更新する
    console.log("useEffect");
    // console.log(sectionWordList);
    console.log(removeIds);

    const getWordList = async (id: string) => {
      setWordList(sectionWordList);
      //   const ramdom = Math.floor(Math.random() * sectionWordList.length);
      //   console.log(ramdom);

      //   let selectWord;
      //   if (id) {
      const selectWord = sectionWordList[Number(id)] as Words;
      //   } else {
      //     selectWord = sectionWordList[ramdom] as Words;
      //   }
      //   sectionWordList.splice(ramdom, 1);
      //   console.log(sectionWordList.length);
      let isDuplicateId = removeIds.find((removeId) => removeId === id);
      if (!isDuplicateId) {
        setRemoveId([...removeIds, id]);
      }
      setWordList(sectionWordList);

      //   console.log(selectWord.word);
      //   console.log(selectWord.example?.replace(selectWord.word, "[   ?   ]"));
      selectWord.example = selectWord.example?.replace(selectWord.word, "[　?　]");
      setCorrectAnswer(selectWord);
    };

    getWordList(id!);
  }, [id]);

  const inputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  const submitAnswer = () => {
    // console.log(answer);
    // console.log(answer === correctAnswer!.word);
    setAnswer("");
  };
  const nextQuestion = () => {
    let ramdom = Math.floor(Math.random() * wordList.length);
    let isDuplicateId = removeIds.find((removeId) => removeId === String(ramdom));
    console.log(isDuplicateId);
    if (removeIds.length !== wordList.length) {
      while (isDuplicateId) {
        ramdom = Math.floor(Math.random() * wordList.length);
        isDuplicateId = removeIds.find((id) => id === String(ramdom));
      }
    } else {
      router.push({
        pathname: "/",
      });
    }
    console.log(ramdom);

    router.push({
      pathname: router.pathname,
      query: { id: ramdom },
    });

    // const selectWord = wordList[ramdom] as Words;
    // const targetWordList = [...wordList];
    // targetWordList.splice(ramdom, 1);
    // setWordList(targetWordList);
    // console.log(selectWord.word);
    // console.log(selectWord.example?.replace(selectWord.word, "[   ?   ]"));
    // selectWord.example = selectWord.example?.replace(selectWord.word, "[　?　]");
    // setCorrectAnswer(selectWord);
  };

  return (
    <>
      <Head>
        <title>出題ページ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Questions</div>
      <p>{correctAnswer && correctAnswer.explain}</p>
      <p>{correctAnswer && correctAnswer.example}</p>
      <p>{correctAnswer && correctAnswer.exampleanswer}</p>
      <p>{correctAnswer && correctAnswer.type}</p>
      <p>{correctAnswer && correctAnswer.word}</p>
      <input type="text" onChange={inputAnswer} />
      <button onClick={submitAnswer}>回答</button>
      <button>PASS</button>
      <button onClick={nextQuestion}>次の問題</button>
    </>
  );
};

export default Questions;
