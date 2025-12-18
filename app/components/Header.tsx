"use client";

import { useMyProfile } from "@/hooks/useMyProfile";

const Header = () => {
  const handleSignOut = () => {
    window.location.href = "/auth/signout";
  };

  const { data } = useMyProfile();

  return (
    <header>
      <h1>Header</h1>
      <p>{data.username}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </header>
  );
};

export default Header;
