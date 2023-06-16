import Link from "next/link";
import React from "react";

const Choice = () => {
  return (
    <>
      <div>Choice</div>
      <Link href={{ pathname: "/questions" }}>
        <a>出題ページ</a>
      </Link>
      <Link href={{ pathname: "/itemlist" }}>
        <a>単語一覧</a>
      </Link>
    </>
  );
};

export default Choice;
