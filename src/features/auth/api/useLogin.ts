import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "src/firebaseconfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const handleLogin = (email: string, password: string) => {
    try {
      setPending(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
          setPending(false);
          navigate("/");
        })
        .catch((err) => {
          setPending(false);
          toast.error(err.message, { position: "top-right", duration: 2500 });
        });
    } catch (error) {
      setPending(false);
      if (error instanceof FirebaseError) {
        toast.error(error.message);
        console.log(error.message);
      }
      setPending(false);
    }
  };
  const SignInWithGoogle = async () => {
    setPending(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      // addUserToDb();
      setPending(false);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setPending(false);
        console.log(error.message);
      }
      setPending(false);
      alert(error);
    }
  };
  return { handleLogin, SignInWithGoogle, pending };
}
