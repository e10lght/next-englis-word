import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { wordListState } from "@/store/auth";
import { useRecoilValue } from "recoil";

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

const ItemList = () => {
  const sectionWordList = useRecoilValue<Words[]>(wordListState);

  useEffect(() => {
    console.log(sectionWordList);
  }, []);

  return (
    <>
      <div>Review</div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>単語</Th>
              <Th>読み</Th>
              <Th>品詞</Th>
              <Th>例文</Th>
              <Th>例文の読み</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sectionWordList.map((word) => (
              <Tr key={word.id}>
                <Td>{word.word}</Td>
                <Td>{word.explain}</Td>
                <Td>{word.type}</Td>
                <Td>{word.example}</Td>
                <Td>{word.exampleanswer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ItemList;
