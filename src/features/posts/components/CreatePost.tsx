import { InputField, SelectField, TextField } from "components/forms";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "features/posts/api/useCreatePost";
import { useState } from "react";
import { postData } from "../types";
import { User } from "firebase/auth";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useUploadImage } from "../api/useUploadImage";

type PostFormData = {
  postTitle: string;
  category: string;
  postContent: string;
  postDescription: string;
  postThumbnail: FileList;
};
export const CreatePost = () => {
  const { register, handleSubmit } = useForm<PostFormData>();
  const createPost = useCreatePost();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const UploadImage = useUploadImage();

  const onSubmit = ({
    postTitle,
    category,
    postDescription,
    postThumbnail,
  }: PostFormData) => {
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
    UploadImage(postThumbnail.item(0)!).then((res) => {
      post.head.thumbnail = res;
      createPost(post).then(() => navigate("/"));
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
            }),
          }}
          className="text-xl font-sans p-6 cursor-text md:text-3xl lg:text-5xl w-4/5"
        />
        <SelectField
          options={["art", "science", "general", "culture", "lifestyle"]}
          registration={{ ...register("category") }}
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
        >
          submit post
        </button>
      </form>
    </div>
  );
};
