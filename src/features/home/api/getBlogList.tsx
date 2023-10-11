import { useQuery } from "@tanstack/react-query";
import { getDocs, collection } from "firebase/firestore";
import { db } from "src/firebaseconfig";

export const GetBlogList = () => {
  return useQuery(
    ["getBlogList"],
    () => {
      return getDocs(collection(db, "posts"));
    },
    { refetchOnWindowFocus: false }
  );
};
