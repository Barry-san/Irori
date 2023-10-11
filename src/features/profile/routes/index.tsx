import { Routes, Route } from "react-router-dom";
import { Profile } from "./Profile";

export const ProfileRoute = () => {
  return (
    <Routes>
      <Route path=":id" element={<Profile />} />
    </Routes>
  );
};
