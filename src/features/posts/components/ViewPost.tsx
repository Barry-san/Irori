import { useGetPost } from "../api/useGetPost";
import { useParams } from "react-router-dom";
import { postData } from "../types";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
// import { useUploadImage } from "../api/useUploadImage";

const ViewPost = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPost(id!);

  const post = data?.data() as postData;
  // useUploadImage();
  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : post ? (
        <div className="mx-auto p-4 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl text-center md:text-3xl lg:text-4xl font-display">
              {post.head.title}
            </h1>

            <img
              src={post.head.thumbnail}
              alt={post.head.title}
              className="aspect-video object-cover md:max-w-[80vw] mx-auto rounded-lg"
            />
          </div>
          <div className="text-center gap-4 justify-center">
            <p className="text-center font-semibold italic underline">
              by -{" "}
              <Link to={`/profile/${post.head.uid}`} className="text-blue-600">
                {post?.head?.author}
              </Link>
            </p>
            <p className="italic text-center">{post.head.date}</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.body.content }}
            className="font-body font-light md:w-9/12 lg:w-7/12 mx-auto  p-4 reading-area"
          ></div>
          <CommentForm
            id={id || ""}
            classname="mx-auto flex flex-col gap-4 p-4 items-start"
          />
          <div className="options flex mx-auto gap-4 ">
            <button className="py-4 w-40 border bg-indigo-400">
              Add to bookmarks
            </button>
            <button className="py-4 w-40 border bg-neutral-200 text-indigo-400">
              share post
            </button>
          </div>
        </div>
      ) : (
        <p>The post you're looking for doesnt exist :P</p>
      )}
    </>
  );
};
export default ViewPost;
