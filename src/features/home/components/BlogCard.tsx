import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";

type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  Key: string | number;
  ind: number;
};

const BlogCard = ({ id, data, Key, ind }: BlogCardProps) => {
  return (
    <div
      className="flex flex- p-2 border border-indigo-400 md:min-h-[90vh] "
      key={Key}
    >
      {/* <p className="p-4">{data.head.category}</p> */}
      <Link
        to={`/post/${id}`}
        className="grid grid-cols-2 gap-4 items-center h-full"
      >
        <img
          src={data.head.thumbnail}
          alt=""
          className={`aspect-square object-cover object-center rounded-md odd:order-${
            ind % 2
          } self-center`}
        />
        <div className="flex flex-col items-start gap-4 p-4">
          <h1 className="text-lg font-display font-bold">{data.head.title}</h1>
          <p className="underline italic">
            <Link to={`profile/${data.head.uid}`}>{data.head.author}</Link>
          </p>
          <p className="font-body font-light">{data.head.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
