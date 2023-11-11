import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { Suspense, lazy } from "react";
import Search from "src/features/search/components/Search";
import Post from "src/features/posts/routes/Post";
import { useUserContext } from "src/context/UserContext";

function AppRoutes() {
  const user = useUserContext();
  const Home = lazy(() => import("src/features/home/components/Home"));
  const Register = lazy(() => import("src/features/auth/components/Register"));
  const Login = lazy(() => import("src/features/auth/components/Login"));
  const CreatePost = lazy(
    () => import("src/features/posts/routes/CreatePostRoute")
  );
  const Profile = lazy(() => import("src/features/profile/routes/Profile"));
  const Bookmarks = lazy(
    () => import("src/features/bookmarks/components/Bookmarks")
  );

  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/post/:id", element: <Post /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/s", element: <Search /> },
  ];
  const protectedRoutes = [
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/register", element: <Register /> },
    { path: "/post/new", element: <CreatePost /> },
    { path: "/post/new/:id", element: <CreatePost /> },
    { path: "/bookmarks", element: <Bookmarks /> },
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
