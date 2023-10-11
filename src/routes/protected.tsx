import { PostRoutes } from "features/posts/routes";
import { ProfileRoute } from "src/features/profile/routes";

export const protectedRoutes = [
  {
    path: "/post/*",
    element: <PostRoutes />,
  },
  {
    path: "/profile/*",
    element: <ProfileRoute />,
  },
];
