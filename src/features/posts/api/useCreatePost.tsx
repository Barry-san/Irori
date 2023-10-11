import { FirestoreError, addDoc, collection } from "firebase/firestore";
import { postData } from "../types";
import { db } from "src/firebaseconfig";
// import { useContext } from "react";

export const useCreatePost = () => {
  const createPost = async (post: postData) => {
    const postDoc = collection(db, "posts");
    try {
      addDoc(postDoc, post).then(console.log).catch(alert);
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.log(error.message);
      }
      console.log(error);
    }
  };
  return createPost;
};
