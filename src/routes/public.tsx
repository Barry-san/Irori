import { AuthRoutes } from "src/features/auth/routes/Index";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
