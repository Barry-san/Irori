import { GetBlogList } from "../api/getBlogList";
import { postData } from "src/features/posts/types";
import BlogCard from "./BlogCard";
import { Layout } from "components/layout/Layout";

const Home = () => {
  const { data, error, isLoading } = GetBlogList();
  return (
    <Layout>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 mx-auto  min-h-full ">
        {isLoading && "loading..."}
        {data
          ? data.docs.map((doc) => {
              const blog = doc.data() as postData;
              const id = doc.id;
              return <BlogCard data={blog} key={id} id={id} variant={"post"} />;
            })
          : ""}
        {error ? "an error occured. Check your connection and try again" : ""}
      </div>
    </Layout>
  );
};

export default Home;
