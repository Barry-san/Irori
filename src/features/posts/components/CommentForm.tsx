import { useForm } from "react-hook-form";
import { db } from "src/firebaseconfig";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import toast from "react-hot-toast";
import { useUserContext } from "src/context/UserContext";

type commentType = {
  body: string;
};

type commentProps = {
  id: string;
  classname?: string;
};
const CommentForm = ({ id, classname }: commentProps) => {
  const user = useUserContext();
  const { register, handleSubmit, reset } = useForm<commentType>();
  const onSubmit = (data: commentType) => {
    const comment = {
      author: user?.displayName,
      body: data.body,
      date: new Date().toDateString(),
    };
    updateDoc(doc(db, "posts", id), { comments: arrayUnion(comment) })
      .then(() => {
        toast.success("comment added.");
        reset();
      })
      .catch((err) => toast(err.message));
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
