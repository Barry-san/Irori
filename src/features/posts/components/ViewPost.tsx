import { useGetPost } from "../api/useGetPost";
import { useParams } from "react-router-dom";
import { postData } from "../types";
import { Link } from "react-router-dom";
// import { useUploadImage } from "../api/useUploadImage";

const ViewPost = () => {
  const { id } = useParams();
  const { data, error, isError, isLoading } = useGetPost(id!);

  const post = data?.data() as postData;
  if (!isLoading) {
    console.log(data?.data());
  } else if (isError) {
    alert(error);
  }
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
              className="aspect-video object-contain md:w-[80%] mx-auto rounded-lg"
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
        </div>
      ) : (
        <p>The post you're looking for doesnt exist :P</p>
      )}
    </>
  );
};
export default ViewPost;
