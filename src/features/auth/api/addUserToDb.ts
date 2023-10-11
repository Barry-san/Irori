// import { useQuery } from "@tanstack/react-query";
import { db } from "src/firebaseconfig";
import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";

export const addUserToDb = (user: User) => {
  const userData = {
    userId: user?.uid,
    userName: user.displayName,
    email: user.email,
    joinDate: new Date().toDateString(),
  };
  const userRef = doc(db, `users/${userData.userId}`);
  setDoc(userRef, userData)
    .then(() => alert("user successfully added to db"))
    .catch(() => alert("failed to addUser"));
};
