import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import SectionImage from "../../public/images/section.jpg";
import { NextPage } from "next";
import Image from "next/image";

type SectionType = {
  name: string;
  id: number;
  created_ad: string;
};

const Section = (props: SectionType) => {
  const { name, id, created_ad } = props;
  const getRandomColor = () => {
    let color = "#";
    const tmp = (id * 1234567).toString(16);
    for (let i = 0; i < 6; i++) {
      color += tmp[i % tmp.length];
    }
    return color;
  };

  return (
    <>
      <div>Sections</div>
      <Flex alignItems="center" justifyContent="center">
        <Link href={{ pathname: "/choice", query: { keyword: id } }} style={{ width: "80%" }}>
          <Box w="full" borderWidth="1px" borderRadius="lg" py={5} px={5} bg="#f5f5f5">
            <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(8, 1fr)">
              <GridItem rowSpan={2} colSpan={1} justifyItems="end">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                  <polygon points="25,0 50,25 25,50 0,25" fill={getRandomColor()} />
                </svg>
              </GridItem>
              <GridItem colSpan={7}>
                <Text as="b">セクション名：{name}</Text>
              </GridItem>
              <GridItem colSpan={7}>
                <Text>追加日：{dayjs(created_ad).format("YYYY年M月DD日")}</Text>
              </GridItem>
            </Grid>
          </Box>
        </Link>
      </Flex>
    </>
  );
};

export default Section;
