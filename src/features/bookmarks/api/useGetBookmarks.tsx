import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebaseconfig";

const useGetBookmarks = (id: string) => {
  return useQuery([`getBookmarks${id}`], () => {
    const bookmarkRef = doc(db, `bookmarks/${id}`);
    return getDoc(bookmarkRef);
  });
};

export default useGetBookmarks;
