import { auth } from "firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import Button from "components/Button";

function Signin({ success, error }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        success();
      })
      .catch(() => {
        error();
      });
  };
  return (
    <div className="max-w-[700px] mx-auto my-16 p-4 ">
      <div className="p-2 text-bold text-center text-3xl">
        <h2>Welcome to Signin Page</h2>
        <p>
          Not a member yet? Click for{" "}
          <Link className="underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-2">
          <label htmlFor="email" className="font-medium text-xl mb-5">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="py-1 font-medium outline"
            {...register("email", {
              required: "This is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="password" className="font-medium text-xl mb-5">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="py-1 font-medium outline"
            {...register("password", {
              required: "This is required",
              minLength: { message: "Min length 6", value: 6 },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <Button>Click for</Button>
      </form>
    </div>
  );
}

export default Signin;
