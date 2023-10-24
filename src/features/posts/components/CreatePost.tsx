import CreateDraft from "../api/useCreateDraft";
import { useUploadImage } from "../api/useUploadImage";
import { postData } from "../types";
import { InputField, SelectField, TextField } from "components/forms";
import { useCreatePost } from "features/posts/api/useCreatePost";
import { User } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useGetDrafts from "src/features/profile/api/useGetDrafts";

type PostFormData = {
  postTitle: string;
  category: string;
  postDescription: string;
  postThumbnail: FileList;
};
const CreatePost = () => {
  const { id = "" } = useParams();
  const user = JSON.parse(localStorage.getItem("currentUser")!) as User;
  const getDraft = useGetDrafts(id, user.uid);
  const [value, setValue] = useState("");
  const { register, handleSubmit, formState, getValues } =
    useForm<PostFormData>({
      defaultValues: async () => {
        const draft = await getDraft();
        setValue((draft.data()!.postContent as string) || "");
        return draft.data() as PostFormData;
      },
    });
  const { errors } = formState;
  const createPost = useCreatePost();
  const navigate = useNavigate();
  const UploadImage = useUploadImage();

  const onSubmit = ({
    postTitle,
    category,
    postDescription,
    postThumbnail,
  }: PostFormData) => {
    toast("uploading post....", { position: "top-right" });
    const post: postData = {
      head: {
        title: postTitle,
        category: category,
        date: new Date().toDateString(),
        description: postDescription,
        author: user.displayName ?? "Anonymous",
        thumbnail: "",
      },
      body: { content: value },
    };
    UploadImage(postThumbnail.item(0)!).then(({ url, error }) => {
      if (!error) {
        post.head.thumbnail = url;
        createPost(post)
          .then(() => navigate("/"))
          .catch(alert);
      } else {
        toast.error(
          "An error occured. Please check your network and try again "
        );
      }
    });
  };
  return (
    <div>
      <button
        className="border py-2 px-8 bg-white border-slate-600 my-2"
        role="none"
        onClick={() => {
          const { postDescription, postTitle, category } = getValues();
          CreateDraft(
            {
              postContent: value,
              postTitle,
              postDescription,
              category,
            },
            user.uid
          ).then(() => {
            navigate("/");
          });
        }}
      >
        Save as draft
      </button>
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
        <p className="text-red-600">{errors.postTitle?.message}</p>
        <SelectField
          options={["art", "science", "general", "culture", "lifestyle"]}
          registration={{
            ...register("category", { required: "this field is required" }),
          }}
          placeholder="Category"
        />
        <p className="text-red-600">{errors.postTitle?.message}</p>
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
          className="md:text-xl p-4 w-full"
        />
        <p className="text-red-600">{errors.postTitle?.message}</p>

        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Enter the post content here "
          className="bg-inherit text-xl"
          style={{ fontSize: 40 }}
        />
        <input
          type="file"
          accept="image/*"
          {...register("postThumbnail", {
            required: "please select an image for the thumbnail.",
          })}
          className="w-52 h-24 border-dashed border border-black"
        />
        <p className="text-red-600">{errors.postTitle?.message}</p>

        <button
          role="submit"
          type="submit"
          className="border py-4 px-8 bg-indigo-400 border-slate-600"
        >
          submit post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
