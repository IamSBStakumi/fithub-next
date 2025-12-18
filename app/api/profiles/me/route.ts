import corsHeaders from "@/utils/corsHeaders";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import getMyInfo from "./getMyInfo";

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  try {
    const info = await getMyInfo(supabase, user.id);

    if (!info) {
      return NextResponse.json({ message: "not found" }, { status: 404, headers: corsHeaders });
    }

    return NextResponse.json(info, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500, headers: corsHeaders });
  }
}
