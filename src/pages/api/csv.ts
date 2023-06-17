import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { createReadStream } from "fs";
import csv from "csv";
import multer from "multer";
import formidable from "formidable";
import { IncomingForm } from "formidable";
import { parse } from "csv";
import supabase from "../../../utils/supabase";

type Data = {
  message: string;
};

type Sectoin = {
  id: string;
  created_at: Date;
  name: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req: NextApiRequest) => {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  try {
    // if (fileExtension !== ".csv") {
    //   throw new Error("CSVファイルをアップロードしてください");
    // }

    const form = new IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        res.statusCode = 500;
        res.json({
          message: err,
        });
        res.end();
        return;
      }
      console.log(files);
      let file = files.files;
      // ファイルをなんやかんやする
      if (Array.isArray(file)) {
        file = file[0];
      }

      const read = createReadStream(file.filepath, { encoding: "utf8" });
      const parser = parse(); // csvファイルをパースする変換ストリーム
      read.pipe(parser); // parserが出力ストリーム

      const { data: sectionIDs, error: sectionError } = await supabase.from("section").select("id");
      const maxId = Math.max(...sectionIDs!.map((obj) => obj.id));
      const sectionname = { name: `セクション${maxId + 1}` };
      const { data: insertedSectionData, error: insertSectionError } = await supabase
        .from("section")
        .insert(sectionname)
        .select()
        .limit(1)
        .single();

      const sectionid = (insertedSectionData as Sectoin).id;

      let isFirstRoop = true;
      for await (const chunk of parser) {
        if (isFirstRoop) {
          isFirstRoop = false;
          continue;
        }

        const wordListData = {
          word: chunk[0],
          example: chunk[1],
          exampleanswer: chunk[2],
          type: chunk[3],
          explain: chunk[4],
          sectionid: sectionid,
        };
        console.log(wordListData);
        const { error: insertWordlistError } = await supabase.from("wordlist").insert(wordListData);
        console.log(insertWordlistError);
      }
      //   rpcの利用
      //   const { data, error } = await supabase.rpc("my_function", { record_id: 1 });
      //   console.log(data);
      //   console.log(error);
      res.status(200).json({ message: "John Doe" });
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(405).json({ message: error.message });
      console.log(error.message);
    }
  }
}
