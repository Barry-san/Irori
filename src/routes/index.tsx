import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Suspense, lazy } from "react";
import Post from "src/features/posts/routes/Post";

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
  const Home = lazy(() => import("src/features/home/components/Home"));
  const Register = lazy(() => import("src/features/auth/components/Register"));
  const Login = lazy(() => import("src/features/auth/components/Login"));
  const CreatePost = lazy(
    () => import("src/features/posts/routes/CreatePostRoute")
  );
  const Profile = lazy(() => import("src/features/profile/routes/Profile"));
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/post/:id", element: <Post /> },
    { path: "/profile/:id", element: <Profile /> },
  ];
  const protectedRoutes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
    { path: "/post/new", element: <CreatePost /> },
  ];
  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen grid place-content-center">
          <p>Loading...</p>
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export default AppRoutes;
