import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";

type SectionType = {
  name: string;
  id: number;
  created_ad: string;
};

const Section = (props: SectionType) => {
  const { name, id, created_ad } = props;
  return (
    <>
      <div>Sections</div>
      <Flex alignItems="center" justifyContent="center">
        <Link href={{ pathname: "/choice", query: { keyword: id } }}>
          <Box w="full" borderWidth="1px" borderRadius="lg" py={5} px={55} bg="#f5f5f5">
            <Text as="b">セクション名：{name}</Text>
            <Text>追加日：{dayjs(created_ad).format("YYYY年M月DD日")}</Text>
          </Box>
        </Link>
      </Flex>
    </>
  );
};

export default Section;
