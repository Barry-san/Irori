import { useQuery } from "@tanstack/react-query";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "src/firebaseconfig";

const useGetOwnPosts = (uid: string) => {
  return useQuery(["getOwnPost"], () => {
    const colle = collection(db, "posts");
    const q = query(colle, where("head.uid", "==", uid));
    return getDocs(q);
  });
};

export default useGetOwnPosts;
