import React from "react";
import { Navigation } from "../navigation/Navigation";
// import Footer from "../Footer/Footer";
type layoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: layoutProps) => {
  return (
    <div className="w-full p-4 min-h-screen  bg-neutral-100">
      <Navigation />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
