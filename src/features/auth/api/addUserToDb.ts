import { db } from "src/firebaseconfig";
import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";

export const addUserToDb = (user: User) => {
  const userData = {
    userId: user.uid,
    userName: user.displayName,
    email: user.email,
    joinDate: new Date().toDateString(),
  };
  const userRef = doc(db, `users/${userData.userId}`);
  setDoc(userRef, userData).catch(() => alert("something went wrong"));
};
