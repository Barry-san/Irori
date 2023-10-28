import { db } from "src/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";

const CreateDraft = async <T extends object>(draft: T) => {
  const collectionRef = collection(db, "drafts");
  addDoc(collectionRef, draft).catch((err) => console.log(err));
};

export default CreateDraft;
