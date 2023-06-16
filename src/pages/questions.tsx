import Head from "next/head";
import React, { useEffect, useState } from "react";
import json from "../json/sample.json";

type Words = {
  word: string;
  example?: string;
  exampleAnswer?: string;
  type: string;
  explain: string;
};

const Questions = () => {
  const [answer, setAnswer] = useState("");
  const [wordList, setWordList] = useState<Words[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Words>();

  useEffect(() => {
    setWordList(json);
    console.log(json[0]);
    let str = "";
    for (const word of json) {
      str += word.word + ",";
    }
    console.log(str);
    const selectWord = json[0] as Words;
    const ramdom = Math.floor(Math.random() * json.length);

    console.log(selectWord.word);
    console.log(selectWord.example?.replace(selectWord.word, "[   ?   ]"));
    selectWord.example = selectWord.example?.replace(selectWord.word, "[　?　]");
    setCorrectAnswer(selectWord);
  }, []);

  const inputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  const submitAnswer = () => {
    console.log(answer);
    console.log(answer === correctAnswer!.word);
    setAnswer("");
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
      <p>{correctAnswer && correctAnswer.exampleAnswer}</p>
      <p>{correctAnswer && correctAnswer.type}</p>
      <p>{correctAnswer && correctAnswer.word}</p>
      <input type="text" onChange={inputAnswer} />
      <button onClick={submitAnswer}>回答</button>
    </>
  );
};

export default Questions;
