import { useForm } from "react-hook-form";
import { InputField } from "src/components/forms/inputfield";
import { AuthLayout } from "./Layout";
import { useRegister } from "../api/useRegister";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { authStyle } from "..";
import { addUserToDb } from "../api";
import { auth } from "src/firebaseconfig";

type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
};
const Register = () => {
  const { register, handleSubmit, control, formState } =
    useForm<RegisterData>();
  const { errors } = formState;
  const { registerUser, pending } = useRegister();
  return (
    <div>
      <AuthLayout title="Register">
        <form
          className="flex flex-col gap-4 p-10"
          onSubmit={handleSubmit((data) =>
            registerUser(
              data.email,
              data.password,
              data.firstName,
              data.lastname
            )
              .catch(alert)
              .then(() => addUserToDb(auth.currentUser!))
          )}
          noValidate
        >
          <InputField
            className={authStyle}
            label="First name:"
            type="text"
            registration={{ ...register("firstName") }}
          />
          <InputField
            className={authStyle}
            label="Last name"
            type="text"
            registration={{ ...register("lastname") }}
          />

          <InputField
            className={authStyle}
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
            className={authStyle}
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
            className=" border-black border p-2 bg-indigo-400"
            disabled={pending}
          >
            {pending ? "Loading..." : "register"}
          </button>
        </form>
        <p className="text-center">
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
export default Register;
