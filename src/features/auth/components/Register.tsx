import { useForm } from "react-hook-form";
import { InputField } from "src/components/forms/inputfield";
import { AuthLayout } from "./Layout";
import { useRegister } from "../api/useRegister";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
};
export const Register = () => {
  const { register, handleSubmit, control, formState } =
    useForm<RegisterData>();
  const { errors } = formState;
  const { registerUser, pending } = useRegister();
  return (
    <div>
      <AuthLayout title="Register">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) =>
            registerUser(
              data.email,
              data.password,
              data.firstName,
              data.lastname
            ).catch(alert)
          )}
          noValidate
        >
          <InputField
            label="first"
            type="text"
            registration={{ ...register("firstName") }}
          />
          <InputField
            label="last name"
            type="text"
            registration={{ ...register("lastname") }}
          />

          <InputField
            label="Email :"
            type="email"
            registration={{
              ...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "please enter a valid email",
                },
                required: {
                  value: true,
                  message: "this field is required",
                },
              }),
            }}
            error={errors.email?.message}
          />
          <InputField
            label="Password :"
            type="password"
            registration={{
              ...register("password", {
                minLength: { value: 6, message: "minimum of 6 characters" },
                required: { value: true, message: "this field is required" },
              }),
            }}
            error={errors.password?.message}
          />
          <button
            type="submit"
            className="border border-black text-center w-48 h-10 bg-blue-600 text-white"
            disabled={pending}
          >
            {pending ? "Loading..." : "register"}
          </button>
        </form>
        <p>
          alreay have an account?{" "}
          <Link to={"/auth/login"} className="text-blue-600 text-center">
            login
          </Link>
        </p>
      </AuthLayout>
      <DevTool control={control} />
    </div>
  );
};
