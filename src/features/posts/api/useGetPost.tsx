import { getDoc, doc } from "firebase/firestore";
import { db } from "src/firebaseconfig";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = (postId: string) => {
  const postRef = doc(db, `posts/${postId}`);
  return useQuery([`Getpost-${postId}`], () => {
    return getDoc(postRef);
  });
};
