import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // 認証チェック
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { weight, bodyFat } = await req.json();

    if (!weight) {
      return NextResponse.json({ error: "Weight is required" }, { status: 400 });
    }

    // weight_logs テーブルへ保存
    const { data, error } = await supabase
      .schema("public")
      .from("weight_logs")
      .insert({
        user_id: user.id,
        weight: parseFloat(weight),
        body_fat: bodyFat ? parseFloat(bodyFat) : null,
        recorded_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
