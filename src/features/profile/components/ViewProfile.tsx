import { useParams } from "react-router-dom";
import { useGetProfile } from "../api/useGetProfile";
import useGetUserPosts from "../api/useGetUserPosts";
import BlogCard from "features/home/components/BlogCard";
import { postData } from "features/posts/types";
import useGetUserDrafts from "../api/useGetUserDrafts";
import { useUserContext } from "src/context/UserContext";

export const ViewProfile = () => {
  const user = useUserContext();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProfile(id!);
  const drafts = useGetUserDrafts(id!);
  const posts = useGetUserPosts(id!);
  console.log(drafts.data);
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
                        id={doc.data().id}
                        key={doc.id}
                        variant={"post"}
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
      <div className="drafts">
        {user?.uid === id ? (
          <>
            <p className="font-medium">Drafts:</p>
            <div>
              {drafts.data?.docs.map((doc) => {
                console.log(doc.data());
                return (
                  <BlogCard
                    data={doc.data() as postData}
                    id={doc.id}
                    key={doc.id}
                    variant={"draft"}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
