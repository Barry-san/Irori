import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "src/firebaseconfig";
import trash from "/trash-solid.svg";
import toast from "react-hot-toast";
import { User } from "firebase/auth";
type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  Key: string | number;
};

const BlogCard = ({ id, data, Key }: BlogCardProps) => {
  const user = JSON.parse(localStorage.getItem("currentUser") ?? "") as User;
  return (
    <div
      className="flex flex-col p-2 border gap-4 border-indigo-400 rounded-lg justify-between "
      key={Key}
    >
      <div className="flex flex-col gap-2">
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
      <p className="text-xs block font-semibold capitalize text-right">
        {data.head.category}
      </p>
      {user.uid === data.head.uid ? (
        <button
          className="w-4 h-4 border"
          onClick={() => {
            toast.loading("deleting post...");
            deleteDoc(doc(db, "posts", id));
          }}
        >
          <span className="sr-only">Delete post</span>
          <img src={trash} alt="delete button" />
        </button>
      ) : null}
    </div>
  );
};

export default BlogCard;
