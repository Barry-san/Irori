import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";

type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  Key: string | number;
};

const BlogCard = ({ id, data, Key }: BlogCardProps) => {
  return (
    <div
      className="flex flex-col p-2 border gap-4 border-indigo-400 rounded-lg"
      key={Key}
    >
      <Link to={`/post/${id}`} className="flex flex-col gap-2">
        <img
          src={data.head.thumbnail}
          alt=""
          className="aspect-video object-cover object-center rounded-lg"
        />
      </Link>
      <Link to={`/post/${id}`}>
        <h1 className="text-lg font-display font-bold">{data.head.title}</h1>
      </Link>
      <p className="underline italic">
        <Link to={`/profile/${data.head.uid}`}>{data.head.author}</Link>
      </p>
      <Link to={`/post/${id}`}>
        <p className="font-body font-light">{data.head.description}</p>
      </Link>
    </div>
  );
};

export default BlogCard;
