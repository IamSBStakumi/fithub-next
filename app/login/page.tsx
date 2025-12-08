"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      <h1>ログインページ</h1>
      <button onClick={() => signIn("google", { redirectTo: "/" })}>
        Googleでログイン
      </button>
    </div>
  );
};

export default Login;
