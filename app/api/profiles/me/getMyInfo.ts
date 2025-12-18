import { SupabaseClient } from "@supabase/supabase-js";

const getMyInfo = async (supabase: SupabaseClient, userId: string) => {
  const { data: profile, error } = await supabase
    .schema("public")
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!profile) {
    return null;
  }

  return { username: profile.username as string, avatarUrl: profile.avatar_url as string };
};

export default getMyInfo;
