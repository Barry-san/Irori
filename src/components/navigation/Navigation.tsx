import { Link, useNavigate } from "react-router-dom";
import { Navlinks } from "./Navlinks";
import { auth } from "src/firebaseconfig";
import { signOut } from "firebase/auth";
export const Navigation = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("currentUser");
  const linky = user
    ? [{ path: "/post/new", title: "New post" }]
    : [
        { path: "/auth/register", title: "Sign Up" },

        { path: "/auth/login", title: "Login" },
      ];
  return (
    <div className="w-full sticky top-0 min-h-4  flex justify-between items-center p-4 md:px-16 font-sans font-medium text-xl z-10 bg-white">
      <Link to={"/"} className=" font-display">
        Irori
      </Link>
      <div className="flex gap-8 justify-between items-center">
        <Navlinks links={linky}></Navlinks>
        {
          <button
            onClick={() => {
              signOut(auth).then(() => {
                navigate("/");
              });
            }}
            className={`${user ? "flex" : "hidden"}`}
          >
            Log out
          </button>
        }
      </div>
    </div>
  );
};
