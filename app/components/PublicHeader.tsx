"use client";

import { useRouter } from "next/navigation";

const PublicHeader = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <header>
      <h1>Public Header</h1>
      <button onClick={handleClick}>サインイン</button>
    </header>
  );
};

export default PublicHeader;
