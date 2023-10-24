import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebaseconfig";

const useGetDrafts = (id: string, uid: string) => {
  return async () => {
    return getDoc(doc(db, `drafts/${uid}/drafts/${id}`));
  };
};

export default useGetDrafts;
