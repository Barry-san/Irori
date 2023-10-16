import React from "react";
import { Navigation } from "../navigation/Navigation";
type layoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: layoutProps) => {
  return (
    <div className="w-full  min-h-screen p-4 bg-neutral-100">
      <Navigation />
      {children}
    </div>
  );
};
