import { auth } from "src/firebaseconfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUserToDb } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import google from "/google.svg";

type layoutProps = {
  title: string;
  children: React.ReactNode;
};

export const AuthLayout = (props: layoutProps) => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        alert(res);
        addUserToDb(res.user);
      })
      .catch((err) =>
        toast.error(err.message, {
          style: {
            background: "black",
            color: "white",
            border: "solid blue 1px",
          },
        })
      );
  };
  return (
    <div className="bg-white w-full min-h-screen grid place-content-center gap-4 ">
      <p className="text-center text-lg font-semibold md:text-xl">
        {props.title}
      </p>
      {props.children}
      <div>
        <button
          className="border w-full py-2 my-2 border-indigo-400 flex items-center justify-center gap-4"
          onClick={() => handleGoogleLogin().then(() => navigate("/"))}
        >
          <span>sign in with google </span>
          <img src={google} alt="" className="inline w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
