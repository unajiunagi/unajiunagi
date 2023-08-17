import { useAuthContext } from "components/provider/AuthProvider";
import { useEffect, useState } from "react";

export const useCreaterMode = () => {
  // 取得中はnull
  const [createrMode, setCreaterMode] = useState<Boolean | null>(null);
  const user = useAuthContext();

  useEffect(() => {
    // サインインしていないならcreaterModeをfalseに設定
    if (!user === null) setCreaterMode(false);
    // サインインしていない、もしくは状態を確認中なら何もしない
    if (!user) return;

    const mode: boolean = user.user_metadata.createrMode;
    setCreaterMode(mode);

    // const getData = async () => {
    //   try {
    //     const { data, error } = await supabase.from("users").select("createrMode").eq("id", user?.id);
    //     if (error) throw error;
    //     setCreaterMode(data[0].createrMode);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // getData();
  }, [user]);

  return createrMode;
};
