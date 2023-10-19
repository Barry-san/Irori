import { db } from "src/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const useGetUserPosts = (uid: string) => {
  return useQuery([`getPosts${uid}`], () => {
    const posts = collection(db, "posts");
    const q = query(posts, where("head.uid", "==", uid));
    return getDocs(q);
  });
};

export default useGetUserPosts;
