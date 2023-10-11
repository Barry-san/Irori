import React from "react";

export const Loading = () => {
  return (
    <div className="w-full grid place-content-center h-screen bg-blue-500">
      <div className="h-10 w-10 border-black animate-spin rounded-full bg-gradient-to-tr from-blue-400 to-red-300"></div>
      <p>Loading...</p>
    </div>
  );
};
