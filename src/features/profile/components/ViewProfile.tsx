import { useParams } from "react-router-dom";
import { useGetProfile } from "../api/useGetProfile";
import useGetUserPosts from "../api/useGetUserPosts";
import BlogCard from "features/home/components/BlogCard";
import { postData } from "features/posts/types";

export const ViewProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProfile(id!);
  const posts = useGetUserPosts(id!);
  return (
    <div>
      {isLoading ? <p>Loading...</p> : ""}
      {isError && <p>an error occured</p>}
      {data && (
        <div className="flex flex-col p-4 gap-4">
          <div>
            <>
              {data.data()?.userName ? (
                <p className="text-xl md:text-3xl font-body">
                  {data.data()?.userName}
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-lg">(≥O≤) </p>
                  <p>"this user does not exist "</p>
                </div>
              )}
            </>
            <p className="text-lg md:text-xl lg:text-2xl">
              Joined : {data.data()?.joinDate}
            </p>
          </div>
          {posts.data && (
            <div className="">
              <h2 className="font-display font-bold text-xl">Posts:</h2>
              {!posts.data?.empty ? (
                <div className="">
                  <div className="grid p-4 gap-4 md:grid-cols-3 w-full">
                    {posts.data!.docs.map((doc) => (
                      <BlogCard
                        data={doc.data() as postData}
                        Key={doc.id}
                        id={doc.data().id}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p>This user has no posts.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
