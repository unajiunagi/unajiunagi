import { useUser } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<User | null | undefined>(null);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const userData = useUser();
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser(undefined)
    }
    //   supabase.auth.onAuthStateChange((event, _session) => {
    //     console.log(`event: ${event}`);
    //     console.log(`_session: ${_session}`);
    //     setUser(_session?.user);
    //   });
    //   // (async () => {
    //   //   // const {
    //   //   //   data: { session },
    //   //   // } = await supabase.auth.getSession();
    //   //   const {
    //   //     data: { session },
    //   //   } = await supabase.auth.refreshSession();
    //   //   console.log(`session: ${session}`);
    //   //   setUser(session?.user);
    //   // })();
  }, []);

  // console.log(`user: ${user}`);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
