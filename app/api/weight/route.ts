// import supabaseClient from "@/lib/supabase/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const session = await auth();

  // if (!session?.user) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { weight, bodyFat } = await req.json();
  console.log(weight, bodyFat);

  // const { data, error } = await supabaseClient().schema("staging").from("weightLog").insert({
  // user_id: session?.user?.id,
  // weight,
  // body_fat: bodyFat,
  // });

  // if (error) {
  //   console.error(error);

  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // return NextResponse.json({ data }, { status: 201 });
}
