import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "src/firebaseconfig";

const useGetDrafts = (id: string) => {
  return useQuery([`getDrafts${id}`], () => {
    if (auth.currentUser?.uid !== id) {
      return null;
    } else {
      return getDocs(collection(db, `drafts/${id}/drafts`));
    }
  });
};

export default useGetDrafts;
