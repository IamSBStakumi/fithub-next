import { getBaseUrl } from "@/utils/url";

const fetchMyProfile = async () => {
  const url = `${getBaseUrl()}/api/profiles/me`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // Supabase Cookie用
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("unauthorized");
    }
    if (res.status === 404) {
      throw new Error("not_found");
    }
    throw new Error("failed_to_fetch");
  }

  return res.json();
};

export default fetchMyProfile;
