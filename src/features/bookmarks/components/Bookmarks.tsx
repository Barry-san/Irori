import { postData } from "src/features/posts/types";
import useGetBookmarks from "../api/useGetBookmarks";
import BlogCard from "src/features/home/components/BlogCard";
type bookmarkType = {
  bookmarks: Omit<postData, "body">[];
};
const Bookmarks = () => {
  const id = JSON.parse(localStorage.getItem("currentUser")!).uid;
  const { data } = useGetBookmarks(id);
  return (
    <div>
      {data ? (
        <>
          {(data.data() as bookmarkType).bookmarks.map((doc, ind) => {
            console.log(doc);
            return <BlogCard data={doc} id="hi" Key={ind} />;
          })}
        </>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Bookmarks;
