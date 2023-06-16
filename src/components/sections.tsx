import Link from "next/link";
import React from "react";

const Sections = () => {
  return (
    <>
      <div>Sections</div>
      <Link href={{ pathname: "/choice" }}>選択ページへ</Link>
    </>
  );
};

export default Sections;
