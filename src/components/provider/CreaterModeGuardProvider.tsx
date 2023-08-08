import { Loading } from "components/common/Loading";
import { useAuthContext } from "components/provider/AuthProvider";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import error from "next/error";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export const CreaterModeGuardProvider = ({ children }: Props) => {
  const router = useRouter();
  const [createrMode, setCreaterMode] = useState<Boolean | null>(null);
  const { user } = useAuthContext();
  const db = getFirestore();
  const uid = user?.uid!;

  useEffect(() => {
    try {
      const docRef = doc(db, "users", uid);
      return onSnapshot(docRef, (doc) => {
        if (doc.exists() && doc.data().createrMode) {
          setCreaterMode(true);
        } else {
          setCreaterMode(false);
        }
      });
    } catch {
      setCreaterMode(false);
      throw error;
    }
  }, []);

  if (createrMode === null) {
    return <Loading />;
  } else if (createrMode) {
    return <>{children}</>;
  } else {
    router.replace("/mypage");
    return <Loading />;
  }
};
