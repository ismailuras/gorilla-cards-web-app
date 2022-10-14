import { auth } from "firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Button from "components/Button";
import { showToast } from "helpers";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      againPassword: "",
    },
  });

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = ({ email, password, againPassword }) => {
    if (password !== againPassword) {
      showToast("Şifreler uyuşmadı", "error");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showToast("Başarılı giriş", "succes");
      })
      .catch((error) => {
        showToast(error.code, "error");
      });
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4 ">
      <div className="p-2 text-bold text-center text-3xl">
        <h2>Welcome to Signup Page</h2>
        <p>
          Already have an account ? Click for{" "}
          <Link className="underline" to="/signin">
            Signin
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
            placeholder="example@mail.com"
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
            placeholder="******"
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
          <label
            className="font-medium text-xl mt-5 mb-5"
            htmlFor="againPassword">
            Password Again
          </label>
          <input
            id="againPassword"
            type="password"
            placeholder="******"
            className="py-1 font-medium outline mt-4"
            {...register("againPassword", {
              required: "This is required",
              minLength: { message: "Min length ", value: 6 },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="againPassword"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <Button>SUBMIT</Button>
      </form>
    </div>
  );
}
export default Signup;
