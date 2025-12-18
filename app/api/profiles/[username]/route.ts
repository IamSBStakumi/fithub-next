import corsHeaders from "@/utils/corsHeaders";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const supabase = await createClient();

  const { username } = await params;
  if (username) {
    return NextResponse.json({ message: "invalid request" }, { status: 400, headers: corsHeaders });
  }

  const { data, error } = await supabase
    .schema("public")
    .from("profiles")
    .select("*")
    .eq("username", username)
    .limit(1);
  if (error) {
    return NextResponse.json({ message: "failed fetch user data" }, { status: 500, headers: corsHeaders });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ message: "not found" }, { status: 404, headers: corsHeaders });
  }
  const user = data[0];

  return NextResponse.json(
    { username: user.username, avatarUrl: user.avatar_url },
    { status: 200, headers: corsHeaders }
  );
}
