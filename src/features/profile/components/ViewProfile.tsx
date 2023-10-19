import { useParams } from "react-router-dom";
import { useGetProfile } from "../api/useGetProfile";
import useGetUserPosts from "../api/useGetUserPosts";
import BlogCard from "src/features/home/components/BlogCard";
import { postData } from "src/features/posts/types";

export const ViewProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProfile(id!);
  const posts = useGetUserPosts(id!);
  console.log(posts.data);
  return (
    <div>
      {isLoading ? <p>Loading...</p> : ""}
      {isError && <p>an error occured</p>}
      {data && (
        <div className="flex flex-col p-4 gap-4">
          <div>
            <p className="text-xl md:text-3x lg:text-4xl">
              {data.data()?.userName || "this user does not exist"}
            </p>
            <p className="text-lg md:text-xl lg:text-2xl">
              Joined : {data.data()?.joinDate}
            </p>
          </div>
          <div className="">
            <h2 className="font-display font-bold text-xl">Posts:</h2>
            {!posts.data?.empty ? (
              <div className="">
                <div className="grid p-4 gap-4 md:grid-cols-3 w-full">
                  {posts.data!.docs.map((doc, ind) => (
                    <BlogCard
                      data={doc.data() as postData}
                      Key={ind}
                      id={doc.data().id}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p>This user has no posts.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
