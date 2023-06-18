import { userState, wordListState } from "@/store/auth";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useBreakpointValue,
  Box,
  Modal,
} from "@chakra-ui/react";
import supabase from "../../utils/supabase";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

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

type Answers = {
  id: any;
  wordlist_id: any;
  user_id: any;
  correct: any;
  answer: any;
  wordlist: {
    section_id: any;
  }[];
};

type mergedType = (Partial<Words> & Partial<Answers>)[];

const Review = () => {
  const sectionWordList = useRecoilValue<Words[]>(wordListState);
  const user = useRecoilValue<User>(userState);
  const [answers, setAnswers] = useState<mergedType>();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchUserAnswers = async () => {
      const { data: result, error } = await supabase
        .from("answers")
        .select(
          `
          id,
          wordlist_id,
          user_id,
          correct,
          answer,
          wordlist (section_id)
        `
        )
        .eq("user_id", user.id);

      console.log(user);
      console.log(result);
      console.log(error);
      let answerResult: Answers[] = [];
      if (!result) {
        return;
      }
      answerResult = result! as Answers[];
      console.log(answerResult);
      const merged = sectionWordList.map((word) => {
        const answer = answerResult.find((answer) => answer.wordlist_id === word.id);
        console.log(answer);
        return {
          ...word,
          answer: answer,
        };
      });
      console.log(merged);
      setAnswers(merged);
    };
    fetchUserAnswers();
  }, []);

  return (
    <>
      <div>Review</div>
      <Box w="full">
        <TableContainer>
          <Table variant="striped" colorScheme="teal" size={isMobile ? "sm" : "md"}>
            <Thead>
              <Tr>
                {!isMobile ? (
                  <>
                    <Th>単語</Th>
                    <Th>読み</Th>
                    <Th>品詞</Th>
                    <Th>回答</Th>
                    <Th>正誤</Th>
                  </>
                ) : (
                  <>
                    <Th>単語</Th>
                    <Th>読み</Th>
                    <Th>詳細</Th>
                  </>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {answers &&
                answers.map((word) => {
                  return !isMobile ? (
                    <Tr key={word.id}>
                      <Td>{word.word}</Td>
                      <Td>{word.explain}</Td>
                      <Td>{word.type}</Td>
                      <Td>{word.answer ? word.answer.answer || "" : "回答なし"}</Td>
                      <Td>{word.answer ? (word.answer.correct ? "◯" : "✗") : "回答なし"}</Td>
                    </Tr>
                  ) : (
                    <Tr key={word.id}>
                      <Td fontSize="12px">{word.word}</Td>
                      <Td fontSize="12px">{word.explain}</Td>
                      <Td fontSize="12px">
                        <ExternalLinkIcon />
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Review;
