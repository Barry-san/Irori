import { Route } from "react-router-dom";
import { Home } from "../components/Home";

export const HomeRoute = () => {
  return <Route path="/" element={<Home />} />;
};
