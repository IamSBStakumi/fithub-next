"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <header>
      <h1>Header</h1>
      {session.data?.user && <button onClick={handleSignOut}>Logout</button>}
    </header>
  );
};

export default Header;
