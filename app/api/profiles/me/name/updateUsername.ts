import { SupabaseClient } from "@supabase/supabase-js";

export class UsernameConflictError extends Error {}

const updateUsername = async (supabase: SupabaseClient, userId: string, username: string) => {
  // ① 事前チェック（UX向上）
  const { data: exists, error: checkError } = await supabase
    .schema("public")
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", userId)
    .maybeSingle();

  if (checkError) {
    throw checkError;
  }

  if (exists) {
    throw new UsernameConflictError("username already exists");
  }

  // ② ユーザーネーム更新
  const { error } = await supabase.schema("public").from("profiles").update({ username }).eq("id", userId);

  if (error) {
    throw error;
  }
};

export default updateUsername;
