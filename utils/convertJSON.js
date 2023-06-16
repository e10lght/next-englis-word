import fs from "node:fs";

// asahi_tango_200
const convertASAHI200 = () => {
  try {
    const path = process.argv[2];
    const str = fs.readFileSync(`../files/${path}.txt`, { encoding: "utf8" });
    // console.log(str);
    let lines = str.split("\n");
    console.log(lines);

    // JSONに変換するための配列を作成
    let jsonArray = [];

    // データを処理してJSONに追加
    for (let i = 0; i < lines.length; i += 3) {
      const match = /■/g;
      let word = lines[i].replace(match, "").trim();
      // console.log(word)

      let type;
      let explain;
      console.log(!Number(lines[i + 2]));
      if (!Number(lines[i + 2]) && i + 1 < lines.length) {
        console.log(word);
        const [typestr, explainstr] = lines[i + 1].split(" ");
        const [type2str, explain2str] = lines[i + 2].split(" ");
        type = typestr + " " + type2str;
        explain = explainstr + " " + explain2str;
        i += 1;
      } else {
        const [typestr, explainstr] = lines[i + 1].split(" ");
        type = typestr;
        explain = explainstr;
      }

      jsonArray.push({
        word: word,
        type: type,
        explain: explain,
      });
    }
    // console.log(jsonArray)
    const jsonstr = JSON.stringify(jsonArray);
    console.log(jsonstr);
    fs.writeFileSync("../src/json/sample.json", jsonstr);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

// CSVで取り込めるようにしたいかも