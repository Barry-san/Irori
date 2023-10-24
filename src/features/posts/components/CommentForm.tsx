import { useForm } from "react-hook-form";
import { db } from "src/firebaseconfig";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

type commentType = {
  body: string;
};

type commentProps = {
  id: string;
  classname?: string;
};
const CommentForm = ({ id, classname }: commentProps) => {
  const { register, handleSubmit } = useForm<commentType>();
  const onSubmit = (data: commentType) => {
    const comment = {
      author: JSON.parse(localStorage.getItem("currentUser")!).displayName,
      body: data.body,
      date: new Date().toDateString(),
    };
    console.log(comment);
    updateDoc(doc(db, "posts", id), { comments: arrayUnion(comment) });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classname}>
      <textarea
        {...register("body")}
        placeholder="enter your comment here"
        className="resize-none w-4/5"
        rows={3}
      />
      <button type="submit" className="bg-indigo-400 px-4 py-2 rounded ">
        comment
      </button>
    </form>
  );
};

export default CommentForm;
