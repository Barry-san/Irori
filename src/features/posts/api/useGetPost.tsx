import { getDoc, doc } from "firebase/firestore";
import { db } from "src/firebaseconfig";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = (postId: string) => {
  const postRef = doc(db, `posts/${postId}`);
  const { isError, isSuccess, error, isLoading, data } = useQuery(
    [`Getpost-${postId}`],
    () => {
      return getDoc(postRef);
    }
  );

  return { data, error, isError, isLoading, isSuccess };
};
