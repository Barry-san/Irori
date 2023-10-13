import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";

type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  Key: string | number;
};

const BlogCard = ({ id, data, Key }: BlogCardProps) => {
  return (
    <div className="flex flex-col gap-2  p-2">
      <Link to={`/post/${id}`} key={Key}>
        <img src={data.head.thumbnail} alt="" className="" />
        <h1 className="text-lg font-sans font-bold">{data.head.title}</h1>
        <p className="font-mono border-gray-400 p-4">{data.head.category}</p>
        <p className="underline uppercase">{data.head.author}</p>
        <p>{data.head.description}</p>
      </Link>
    </div>
  );
};

export default BlogCard;
