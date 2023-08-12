import { User } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<User | null | undefined>(null);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
