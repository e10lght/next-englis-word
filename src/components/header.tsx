import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <div>Header</div>
      <Link href={{ pathname: "/review" }}>
        <a>復習ページへ</a>
      </Link>
    </>
  );
};

export default Header;
