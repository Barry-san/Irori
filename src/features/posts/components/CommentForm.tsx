import { useForm } from "react-hook-form";
import { TextField } from "src/components/forms";
import { db } from "src/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";

type commentType = {
  body: string;
};

type commentProps = {
  id: string | undefined;
  classname?: string;
};
const CommentForm = ({ id, classname }: commentProps) => {
  const { register, handleSubmit } = useForm<commentType>();
  const onSubmit = (data: commentType) => {
    const comment = {
      author: JSON.parse(localStorage.getItem("currentUser") ?? "{}"),
      body: data.body,
      date: new Date().toString(),
    };
    console.log(comment);
    addDoc(collection(db, `comments/${id}/comments`), comment);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classname}>
      <TextField
        registration={register("body")}
        columns={30}
        rows={3}
        placeholder="enter your comment here"
      />
      <button type="submit" className="bg-indigo-400 px-4 py-2 rounded-lg">
        {" "}
        submit
      </button>
    </form>
  );
};

export default CommentForm;
