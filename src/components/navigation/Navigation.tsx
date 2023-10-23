import { Link } from "react-router-dom";
import habmurger from "/bars-solid.svg";
import search from "/search.svg";
import Menu from "./components/Menu";
import Toggle from "./utils/menuToggle";
import { useRef } from "react";
export const Navigation = () => {
  const ref = useRef<Element | null>(null);

  return (
    <nav className="w-full sticky top-0 flex justify-between items-center p-4 font-sans font-medium text-xl bg-neutral-100">
      <Link to={"/"} className="">
        <span className="text-indigo-600 font-bold uppercase font-body">
          I r o r i
        </span>
      </Link>
      <Link to={"/s"} title="search">
        <span className="sr-only">search</span>
        <img src={search} alt="search button" />
      </Link>
      <div className="flex gap-8 justify-between items-center">
        <button className="z-30" onClick={() => Toggle(ref.current)}>
          <img alt="menu icon" src={habmurger} className="h-6 w-6" />
        </button>
        <Menu ref={ref} />
      </div>
    </nav>
  );
};
