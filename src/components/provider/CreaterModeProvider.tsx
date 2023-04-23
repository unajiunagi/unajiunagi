import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";

type Props = {};

export const CreaterModeProvider = ({}: Props) => {
  const user = getAuth().currentUser;
  const db = getFirestore();
  const uid = user?.uid!;

  useEffect(() => {
    const checkCreaterMode = async () => {
      const docRef = doc(db, "users", uid);
      const d = await getDoc(docRef);
      // const { createrMode } = d;
    };
    checkCreaterMode();
  }, []);

  return <></>;
};
