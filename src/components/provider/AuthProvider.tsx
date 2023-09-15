import { User } from "@supabase/supabase-js";
import supabaseClient from "lib/supabase/supabaseClient";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<User | null | undefined>(null);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session?.user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
