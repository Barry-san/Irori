import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "src/firebaseconfig";
const useGetUserDrafts = (uid: string) => {
  return useQuery([`getDrafts${uid}`], () => {
    return getDocs(
      query(collection(db, "drafts"), where("head.uid", "==", uid))
    );
  });
};
export default useGetUserDrafts;
