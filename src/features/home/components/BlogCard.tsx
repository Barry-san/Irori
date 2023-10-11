import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";

import React from "react";
type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  Key: string | number;
};

export const BlogCard = ({ id, data, Key }: BlogCardProps) => {
  return (
    <div className="flex flex-col gap-2 border-black border p-4 bg-[#242320] text-slate-200">
      <Link to={`/post/post/${id}`} key={Key}>
        <img src={data.head.thumbnail} alt="" />
        <h1 className="text-lg font-sans font-bold">{data.head.title}</h1>
        <p className="font-mono border-gray-400 p-4">{data.head.category}</p>
        <p className="underline uppercase">{data.head.author}</p>
        <p>{data.head.description}</p>
      </Link>
    </div>
  );
};
