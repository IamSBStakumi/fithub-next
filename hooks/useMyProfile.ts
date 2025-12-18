import { useQuery } from "@tanstack/react-query";
import fetchMyProfile from "@/features/profile/fetchMyProfile";
import type { MyProfile } from "@/types/MyProfile";

export const useMyProfile = () => {
  return useQuery<MyProfile, Error>({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
    retry: false, // 401 / 404 でリトライ不要
  });
};
