import { postData } from "src/features/posts/types";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "src/firebaseconfig";
import trash from "/trash-solid.svg";
import toast from "react-hot-toast";
import { useUserContext } from "src/context/UserContext";

type BlogCardProps = {
  id: string;
  data: Omit<postData, "body">;
  variant: "post" | "draft";
};

const BlogCard = ({ id, data, variant }: BlogCardProps) => {
  const user = useUserContext();
  return (
    <div className="flex flex-col p-2 border gap-4 border-indigo-400 rounded-lg justify-between ">
      <div className="flex flex-col gap-2">
        <Link
          to={`/${variant == "post" ? "post" : "post/new"}/${id}`}
          className="flex flex-col gap-2"
        >
          <img
            src={data.head.thumbnail}
            alt=""
            className="aspect-video object-cover object-center rounded-lg"
          />
        </Link>
        <Link to={`/${variant == "post" ? "post" : "post/new"}/${id}`}>
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
      {user?.uid === data.head.uid ? (
        <button
          className="w-4 h-4 border"
          onClick={() => {
            toast("deleting post...");
            deleteDoc(
              doc(db, `${variant === "post" ? "posts" : "drafts"}`, id)
            ).then(() => toast(`${variant} deleted`));
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
