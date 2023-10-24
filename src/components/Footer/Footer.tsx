import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" w-full bg-white border p-4 flex justify-between items-start absolute bottom-0">
      <div className="contact flex-grow text-3xl bg-indigo-600 bg-clip-text hover:text-transparent transition-all">
        <p>I R O R I</p>
      </div>
      <div className="nav flex flex-col flex-grow text-3xl md:text-6xl border-l border-indigo-400 font-display items-end">
        <Link to={"https://github.com/barry-san"} className=" hover:underline ">
          Github{" "}
        </Link>
        <Link to={"https://twitter.com/barry9ja"} className=" hover:underline ">
          Twitter
        </Link>
        <Link
          to={"https://linkdin.com/oyeyemi_mubarak"}
          className=" hover:underline "
        >
          Linkdin
        </Link>
      </div>
    </div>
  );
};

export default Footer;
