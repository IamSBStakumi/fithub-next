import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}
