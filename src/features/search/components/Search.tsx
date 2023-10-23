import { useSearchParams } from "react-router-dom";
// import { useSearch } from "../api/useSearch";
import BlogCard from "src/features/home/components/BlogCard";
import { postData } from "src/features/posts/types";
import { GetBlogList } from "src/features/home/api/getBlogList";
import { Layout } from "src/components/layout";

const Search = () => {
  const [params, setParams] = useSearchParams({ q: "" });
  const q = params.get("q")!;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ q: e.target.value });
  };
  const { data } = GetBlogList();
  return (
    <Layout>
      <div className="w-full p-4 flex flex-col gap-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center justify-center gap-2"
        >
          <input
            className="w-60 p-2  border border-black"
            onChange={handleChange}
            placeholder="search for posts by title"
            type="text"
            value={q}
          />
          {/* <button type="submit">
            <span className="sr-only">search</span>
            <img src={search} alt="" />
          </button> */}
        </form>
        {q.length === 0 && (
          <p className="mx-auto text-center">whatcha looking for?🙃</p>
        )}
        {!data && q.length ? (
          <p className="mx-auto">Loading...</p>
        ) : (
          <div className="w-full grid md:grid-cols-3">
            {!!q.length &&
              data?.docs
                .filter((doc) =>
                  (doc.data() as postData).head.title
                    .toLowerCase()
                    .includes(q.toLowerCase())
                )
                .map((doc) => {
                  console.log(doc.data());
                  return (
                    <BlogCard
                      data={doc.data() as postData}
                      id={doc.id}
                      Key={doc.id}
                    />
                  );
                })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
