import { useAuthContext } from "components/provider/AuthProvider";
import supabaseClient from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export const usecreatorMode = () => {
  // 取得中はundefined
  const [creatorMode, setcreatorMode] = useState<Boolean | undefined>(undefined);
  const user = useAuthContext();

  useEffect(() => {
    // サインインしていない、もしくは状態を確認中なら何もしない
    if (user === undefined) return;
    // サインインしていないならcreatorModeをfalseに設定
    if (user === null) return setcreatorMode(false);

    (async () => {
      try {
        const { data, error } = await supabaseClient.from("users").select("creator_mode").eq("id", user?.id).single();
        if (error) throw error;
        setcreatorMode(data.creator_mode);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return creatorMode;
};
