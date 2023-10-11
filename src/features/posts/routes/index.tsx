import { Routes, Route } from "react-router-dom";

import { CreatePostRoute } from "./CreatePostRoute";
import { Post } from "./Post";

export const PostRoutes = () => {
  return (
    <Routes>
      <Route path="new" element={<CreatePostRoute />} />
      <Route path=":postId" element={<Post />} />
    </Routes>
  );
};
