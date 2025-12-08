import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, Profile, User, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import supabaseClient from "./lib/supabase/supabaseClient";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //   pages: {
  //     signIn: "/login",
  //   },

  //   session: {
  //     strategy: "jwt",
  //   },

  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }): Promise<string> {
      return `${baseUrl}/dashboard`;
    },

    // async jwt({
    //   token,
    //   user,
    //   account,
    //   profile,
    //   isNewUser,
    //   trigger,
    // }: {
    //   token: JWT;
    //   user?: User;
    //   account?: Account | null;
    //   profile?: Profile;
    //   isNewUser?: boolean;
    //   trigger?: "update" | "signIn" | "signUp";
    // }): Promise<JWT> {
    //   // OAuth 初回ログイン時
    //   if (account && profile) {
    //     token.googleId = profile.sub as string;
    //     token.email = profile.email as string;
    //     token.name = profile.name as string;
    //   }

    //   return token;
    // },
    async signIn({ user, account }) {
      console.log("signIn callback hit");

      const { error } = await supabaseClient
        .schema("staging")
        .from("users")
        .upsert({
          google_id: account?.providerAccountId,
          email: user.email,
          username: user.name,
          avatar_url: user.image,
        });

      if (error) {
        console.error(error);
        return false;
      }

      return true;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      const { data } = await supabaseClient
        .schema("staging")
        .from("users")
        .select("id")
        .eq("email", session.user.email)
        .single();

      return {
        ...session,
        user: {
          ...session.user,
          id: data?.id,
        },
      };
    },
  },
});
