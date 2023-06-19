import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, wordListState } from "@/store/auth";
import { useRouter } from "next/router";
import supabase from "../../utils/supabase";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

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

const Questions = () => {
  const [answer, setAnswer] = useState("");
  const [wordList, setWordList] = useState<Words[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<Words>();
  const [removeIds, setRemoveId] = useState<string[]>([]);
  const user = useRecoilValue<User>(userState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useRecoilValueで値だけ宣言することも可能
  const sectionWordList = useRecoilValue(wordListState);
  const router = useRouter();
  const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

  useEffect(() => {
    // apiなどからユーザー情報を取得して、setUserでグローバルstateを更新する
    console.log("useEffect");
    console.log(removeIds);
    console.log(id);

    const getWordList = async (id: string) => {
      setWordList(sectionWordList);
      const selectWord = sectionWordList[Number(id)] as Words;
      let isDuplicateId = removeIds.find((removeId) => removeId === id);
      if (!isDuplicateId) {
        setRemoveId([...removeIds, id]);
      }
      setWordList(sectionWordList);
      selectWord.example = selectWord.example?.replace(selectWord.word, "[　?　]");
      setCorrectAnswer(selectWord);
    };

    getWordList(id!);
  }, [id]);

  const inputAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  const submitAnswer = async () => {
    // あとは回答の判定結果と回答をanswersテーブルにinsertする
    const insertAnswer = {
      user_id: user.id,
      wordlist_id: correctAnswer?.id,
      correct: answer.toLowerCase() === correctAnswer?.word.toLowerCase(),
      answer: answer,
    };

    onOpen();

    const { error } = await supabase.from("answers").insert(insertAnswer);
    console.log(error);

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
    setAnswer("");
    onClose();

    router.push({
      pathname: router.pathname,
      query: { id: ramdom },
    });
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
      <Stack spacing={3} m={5}>
        <Input
          type="text"
          placeholder="ここに回答を入力する"
          size="lg"
          onChange={inputAnswer}
          value={answer}
        />
      </Stack>
      <Box display="flex" justifyContent="space-between" m={5}>
        <Button flexGrow={1} mx={1} colorScheme="blue" onClick={submitAnswer}>
          回答
        </Button>
        <Button flexGrow={1} mx={1} colorScheme="red" onClick={nextQuestion}>
          PASS
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Text>ここに正解とか、解説とかを載せる？</Text>
            <Text>ここに正解とか、解説とかを載せる？</Text>
            <Text>ここに正解とか、解説とかを載せる？</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={nextQuestion}>次の問題</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Questions;
