import { Routes, Route } from "react-router-dom";
import Register from "features/auth/components/Register";
import Login from "features/auth/components/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
