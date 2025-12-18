import corsHeaders from "@/utils/corsHeaders";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import updateUsername, { UsernameConflictError } from "./updateUsername";

type Body = {
  username?: string;
};

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  const body = (await request.json()) as Body;

  if (!body.username || body.username.trim().length === 0) {
    return NextResponse.json({ message: "username is required" }, { status: 400, headers: corsHeaders });
  }

  if (body.username.length > 30) {
    return NextResponse.json({ message: "username is too long" }, { status: 400, headers: corsHeaders });
  }

  try {
    await updateUsername(supabase, user.id, body.username);

    return NextResponse.json({ message: "updated" }, { status: 200, headers: corsHeaders });
  } catch (error) {
    if (error instanceof UsernameConflictError) {
      return NextResponse.json({ message: error.message }, { status: 409, headers: corsHeaders });
    }

    return NextResponse.json({ message: (error as Error).message }, { status: 500, headers: corsHeaders });
  }
}
