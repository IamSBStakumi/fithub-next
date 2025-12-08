import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      googleId?: string;
      email?: string;
      name?: string;
      username?: string;
      isFirstLogin?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    googleId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
    email?: string;
    name?: string;
    username?: string;
    isFirstLogin?: boolean;
  }
}
