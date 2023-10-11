import { useGetPost } from "../api/useGetPost";
import { useParams } from "react-router-dom";
import { postData } from "../types";
// import { useUploadImage } from "../api/useUploadImage";

export const ViewPost = () => {
  const { postId } = useParams();
  const { data, error, isError, isLoading, isSuccess } = useGetPost(postId!);
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
      ) : isSuccess ? (
        <div className="mx-auto p-4 flex flex-col gap-4 md:w-9/12 lg:w-7/12">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl text-center md:text-3xl lg:text-4xl">
              {post.head.title}
            </h1>
            <img src={post.head.thumbnail} alt={post.head.title} />
            <p className="text-center font-semibold italic underline">
              by - {post.head.author}
            </p>
            <p className="italic text-center">{post.head.date}</p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.body.content }}
            className=""
          ></div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};
