"use client";

const Header = () => {
  const handleSignOut = () => {
    window.location.href = "/auth/signout";
  };

  return (
    <header>
      <h1>Header</h1>
      <button onClick={handleSignOut}>Sign out</button>
    </header>
  );
};

export default Header;
