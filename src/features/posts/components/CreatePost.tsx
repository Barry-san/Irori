import { postData } from "../types";
import { InputField, SelectField, TextField } from "components/forms";
import { useCreatePost } from "features/posts/api/useCreatePost";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { User } from "firebase/auth";
import { useUploadImage } from "../api/useUploadImage";
import { toast } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type PostFormData = {
  postTitle: string;
  category: string;
  postContent: string;
  postDescription: string;
  postThumbnail: FileList;
};
const CreatePost = () => {
  const [value, setValue] = useState("");
  const { register, handleSubmit } = useForm<PostFormData>();
  const createPost = useCreatePost();
  const navigate = useNavigate();
  const UploadImage = useUploadImage();
  const btnRef = useRef<null | HTMLButtonElement>(null);

  const onSubmit = ({
    postTitle,
    category,
    postDescription,
    postThumbnail,
  }: PostFormData) => {
    toast("uploadin post....");
    const post: postData = {
      head: {
        title: postTitle,
        category: category,
        date: new Date().toDateString(),
        description: postDescription,
        author:
          (JSON.parse(localStorage.getItem("currentUser")!) as User)
            .displayName ?? "Anonymous",
        thumbnail: "",
      },
      body: { content: value },
    };
    UploadImage(postThumbnail.item(0)!).then(({ url, error }) => {
      btnRef.current?.setAttribute("disabled", "true");
      if (!error) {
        post.head.thumbnail = url;
        createPost(post)
          .then(() => navigate("/"))
          .catch(alert);
      } else {
        toast(String(error));
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          type="text"
          placeholder="Enter The post title here. Maximum of 100 characters"
          registration={{
            ...register("postTitle", {
              maxLength: {
                value: 100,
                message: "Maximum of 100 characters",
              },
              required: { value: true, message: "this field is required" },
            }),
          }}
          className="text-xl font-sans p-6 cursor-text md:text-3xl lg:text-5xl w-full"
        />
        <SelectField
          options={["art", "science", "general", "culture", "lifestyle"]}
          registration={{
            ...register("category", { required: "this field is required" }),
          }}
          placeholder="Category"
        />
        <TextField
          placeholder="enter the post description here... maximum 400 characters"
          columns={25}
          rows={3}
          registration={{
            ...register("postDescription", {
              required: { value: true, message: "this field is required" },
              maxLength: { value: 400, message: "maximum of 400 characters" },
              minLength: {
                value: 10,
                message: "a minimum of 10 characters please",
              },
            }),
          }}
          className="md:text-2xl p-4 w-full"
        />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Enter the post content here "
          className="bg-inherit text-xl"
        />
        <input
          type="file"
          accept="image/*"
          {...register("postThumbnail", {
            required: "please select an image for the thumbnail.",
          })}
          className="w-52 h-24 border-dashed border border-black"
        />
        <button
          role="submit"
          className="border py-4 bg-indigo-400 border-slate-600"
          ref={btnRef}
        >
          submit post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
