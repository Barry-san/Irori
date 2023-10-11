import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "src/firebaseconfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToDb } from ".";

export const useRegister = () => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const registerUser = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      setPending(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: `${firstname} ${lastname}`,
      }).then(() => {
        addUserToDb(user);
      });
      navigate("/");
    } catch (error) {
      setPending(false);
      if (error instanceof FirebaseError) {
        setPending(false);
        console.log(error);
      }
    }
  };
  return { registerUser, pending };
};
