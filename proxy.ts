import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/login", // ログインページ
    "/dashboard/:path*", // ダッシュボードページ
  ],
};

export default async function proxy(req: NextRequest) {
  const session = await auth();

  const isLoggedIn = !!session?.user;
  const pathname = req.nextUrl.pathname;

  // ログインページにログイン済みユーザーが来たらトップへ
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 認証が必要なページのガード
  const protectedRoutes = ["/dashboard"];

  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
