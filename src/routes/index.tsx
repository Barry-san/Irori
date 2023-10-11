import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { HomeRoute } from "src/features/home/routes";
import { Home } from "src/features/home/components/Home";

function AppRoutes() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.clear();
    }
  });
  const user = localStorage.getItem("currentUser");
  const commonRoutes = [{ path: "/", element: <Home></Home> }];
  const routes = user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
}

export default AppRoutes;
