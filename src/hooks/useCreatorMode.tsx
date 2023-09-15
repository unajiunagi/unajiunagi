import { useAuthContext } from "components/provider/AuthProvider";
import useSWR from "swr";
import { fetcherDefault } from "util/fetcherDefault";

type CreaterModeRes = {
  creator_mode: boolean;
};

export const useCreatorMode = () => {
  const user = useAuthContext();
  const key = user ? `/api/supabase/getCreatorMode/${user.id}` : null;
  const { data, error } = useSWR<CreaterModeRes>(key, fetcherDefault);

  if (error || user === null) return false;
  // 取得中はundefined
  if (!data || user === undefined) return undefined;

  return data.creator_mode;
};
