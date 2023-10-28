import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebaseconfig";

const useGetDrafts = (id: string) => {
  return async () => {
    return getDoc(doc(db, `drafts/${id}`));
  };
};

export default useGetDrafts;
