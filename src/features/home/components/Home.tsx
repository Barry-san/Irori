import { GetBlogList } from "../api/getBlogList";
import { postData } from "src/features/posts/types";
import { BlogCard } from "./BlogCard";
import { Layout } from "components/layout/Layout";
// import { Loading } from "components/loading/Loading";

export const Home = () => {
  const { data, error, isLoading } = GetBlogList();
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mx-auto p-4 min-h-full">
        {isLoading && "loading..."}
        {/* <Loading /> */}
        {data
          ? data.docs.map((doc) => {
              const blog = doc.data() as postData;
              const id = doc.id;
              return <BlogCard data={blog} Key={id} id={id} />;
            })
          : ""}
        {error ? "an error occured. Check your connection and try again" : ""}
      </div>
    </Layout>
  );
};