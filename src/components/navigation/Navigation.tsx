import { Link, useNavigate } from "react-router-dom";
import { Navlinks } from "./Navlinks";
import { auth } from "src/firebaseconfig";
import { signOut } from "firebase/auth";
import search from "public/search.svg";
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
    <nav className="w-full sticky top-0 min-h-4  flex justify-between items-center p-4 md:px-16 font-sans font-medium text-xl z-10 bg-neutral-100 ">
      <Link to={"/"} className="">
        <span className="text-indigo-600 font-bold">Irori</span>
      </Link>
      <Link to={"/s"} title="search">
        <span className="sr-only">search</span>
        <img src={search} alt="search button" />
      </Link>
      <div className="flex gap-8 justify-between items-center">
        <Navlinks links={linky} />
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
    </nav>
  );
};
