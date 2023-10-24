import { Navlinks } from "../Navlinks";
import { auth } from "src/firebaseconfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { forwardRef } from "react";

const Menu = forwardRef(function (props, ref) {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const links = user
    ? [
        { path: "/post/new", title: "New post" },
        { path: `/profile/${user.uid}`, title: "Profile" },
        { path: "/bookmarks", title: "bookmarks" },
      ]
    : [
        { path: "/auth/register", title: "Sign Up" },

        { path: "/auth/login", title: "Login" },
      ];
  return (
    <div
      className="menu md:w-1/4 bg-neutral-200 px-8 border py-40 top-0 right-0 fixed md:h-screen flex-col hidden gap-4 items-end justify-end"
      ref={ref as React.LegacyRef<HTMLDivElement>}
      {...props}
    >
      <Navlinks links={links} />
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
  );
});

export default Menu;
