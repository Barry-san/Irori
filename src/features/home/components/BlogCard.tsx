import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";

type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  Key: string | number;
};

const BlogCard = ({ id, data, Key }: BlogCardProps) => {
  return (
    <div className="flex flex-col p-4 border border-indigo-400 " key={Key}>
      {/* <p className="p-4">{data.head.category}</p> */}
      <Link to={`/post/${id}`} className="flex flex-col gap-2 items-center">
        <img src={data.head.thumbnail} alt="" className="" />
        <h1 className="text-lg font-display font-bold">{data.head.title}</h1>
        <p className="underline italic">{data.head.author}</p>
      </Link>
      <p className="font-body font-light">{data.head.description}</p>
    </div>
  );
};

export default BlogCard;
