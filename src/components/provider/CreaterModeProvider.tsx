import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "components/provider/AuthProvider";

type InitialState = {
  createrMode: Boolean | null;
};

const initialState: InitialState = {
  createrMode: null,
};
const CreaterModeContext = createContext<InitialState>(initialState);

type Props = {
  children: ReactNode;
};

export const CreaterModeProvider = ({ children }: Props) => {
  const [createrMode, setCreaterMode] = useState<InitialState>(initialState);
  const { user } = useAuthContext();
  const db = getFirestore();

  useEffect(() => {
    if (!user) {
      return;
    }
    try {
      const docRef = doc(db, "users", user.uid);
      return onSnapshot(docRef, (doc) => {
        if (doc.exists() && doc.data().createrMode) {
          setCreaterMode({
            createrMode: doc.data().createrMode,
          });
        } else {
          setCreaterMode({
            createrMode: false,
          });
        }
      });
    } catch (error) {
      setCreaterMode({
        createrMode: false,
      });
      console.log(`error: ${error}`);
    }
  }, [user]);

  return <CreaterModeContext.Provider value={createrMode}>{children}</CreaterModeContext.Provider>;
};

export const useCreaterModeContext = () => useContext(CreaterModeContext);
