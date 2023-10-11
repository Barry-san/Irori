import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { InputField } from "components/forms/inputfield";
import { AuthLayout } from "./Layout";
import { Link } from "react-router-dom";
import useLogin from "../api/useLogin";

type formData = {
  email: string;
  password: string;
};

const authStyle = "p-2 border-black border";

function Login() {
  const { register, control, handleSubmit, formState } = useForm<formData>();
  const { errors } = formState;
  const { handleLogin, pending } = useLogin();
  const OnSubmit = (data: formData) => {
    const { email, password } = data;
    handleLogin(email, password);
  };
  return (
    <div className="login">
      <AuthLayout title="Login">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(OnSubmit)}
          noValidate
        >
          <InputField
            className={authStyle}
            label="email : "
            type="email"
            registration={{
              ...register("email", {
                required: { value: true, message: "this field is required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "please enter a valid email",
                },
              }),
            }}
            error={errors.email?.message}
          />
          <InputField
            label="password : "
            type="password"
            registration={{
              ...register("password", {
                required: { value: true, message: "this field is required" },
                minLength: { value: 6, message: "minimum of 6 characters" },
              }),
            }}
            error={errors.password?.message}
          />
          <button
            type="submit"
            className="w-48 h-10 border text-white bg-blue-600"
            disabled={pending}
          >
            {pending ? "loading..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to={"/auth/register"} className="text-blue-600 text-center">
            sign up.
          </Link>
        </p>
      </AuthLayout>
      <DevTool control={control} />
    </div>
  );
}

export default Login;