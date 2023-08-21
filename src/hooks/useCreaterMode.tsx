import { useAuthContext } from "components/provider/AuthProvider";
import supabaseClient from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";

export const useCreaterMode = () => {
  // 取得中はundefined
  const [createrMode, setCreaterMode] = useState<Boolean | undefined>(undefined);
  const user = useAuthContext();

  useEffect(() => {
    // サインインしていない、もしくは状態を確認中なら何もしない
    if (user === undefined) return;
    // サインインしていないならcreaterModeをfalseに設定
    if (user === null) return setCreaterMode(false);

    (async () => {
      try {
        const { data, error } = await supabaseClient.from("users").select("creater_mode").eq("id", user?.id).single();
        if (error) throw error;
        setCreaterMode(data.creater_mode);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return createrMode;
};
