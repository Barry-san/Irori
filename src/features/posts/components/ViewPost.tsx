import { useGetPost } from "../api/useGetPost";
import { useParams } from "react-router-dom";
import { postData } from "../types";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentCard from "src/components/comments/CommentCard";
import { useUserContext } from "src/context/UserContext";

const ViewPost = () => {
  const user = useUserContext();
  const { id } = useParams();
  const { data, isLoading } = useGetPost(id!);
  const post = data?.data() as postData;

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
            className="font-body font-light md:w-9/12 lg:w-7/12 mx-auto p-4 reading-area"
          ></div>

          {/* //comment section */}
          <div>
            {post?.comments && (
              <>
                <p className="text-center">Comments:</p>
                {post.comments.map((comment) => {
                  return (
                    <CommentCard
                      date={comment.date}
                      author={comment.author}
                      body={comment.body}
                    />
                  );
                })}
              </>
            )}
            {user ? (
              <CommentForm
                id={id!}
                classname="mx-auto flex flex-col gap-4 p-4 items-start w-full md:w-2/5"
              />
            ) : null}
          </div>
        </div>
      ) : (
        <p>The post you're looking for doesnt exist :P</p>
      )}
    </>
  );
};
export default ViewPost;
