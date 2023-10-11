import { getDoc, doc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "src/firebaseconfig";

export const useGetProfile = (id: string) => {
  return useQuery(
    ["getProfile"],
    () => {
      const userRef = doc(db, `users/${id}`);
      return getDoc(userRef);
    },
    {}
  );
};
