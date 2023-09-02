import { useAuthContext } from "components/provider/AuthProvider";
import supabaseClient from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export const useCreatorMode = () => {
  // 取得中はundefined
  const [creatorMode, setCreatorMode] = useState<Boolean | undefined>(undefined);
  const user = useAuthContext();

  useEffect(() => {
    // サインインしていない、もしくは状態を確認中なら何もしない
    if (user === undefined) return;
    // サインインしていないならcreatorModeをfalseに設定
    if (user === null) return setCreatorMode(false);

    (async () => {
      try {
        const { data, error } = await supabaseClient.from("users").select("creator_mode").eq("id", user?.id).single();
        if (error) throw error;
        setCreatorMode(data.creator_mode);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return creatorMode;
};
