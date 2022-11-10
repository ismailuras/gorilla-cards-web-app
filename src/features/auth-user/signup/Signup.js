import { useState } from "react";
import { auth } from "firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "helpers";
import Button from "components/Button";
import ShowPassword from "features/showpassword/ShowPassword";
import AutWithGoogle from "../auth-with-google/AuthWithGoogle";

function Signup() {
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rePassword: "",
    },
  });

  const onSubmit = ({ email, password }) => {
    isLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        reset();
        showToast("You have signed up successfully", "success");
        navigate("/user-profile");
        isLoading(false);
        navigate("/user-profile");
      })
      .catch((error) => {
        isLoading(false);
        if (error.code.includes("auth/email-already-in-use")) {
          showToast("Email already in use", "error");
          return;
        }
        if (error.code.includes("auth/network-request-failed")) {
          showToast("Network request failed. Pleas try again.", "error");
          return;
        }
        if (error.code.includes("auth/invalid-user-token")) {
          showToast("Your account has timed out. Please login again.", "error");
          return;
        }
        return showToast("Unexpected error occured. Try again", "error");
      });
  };

  const password = watch("password");

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div className="p-2 text-bold text-center text-3xl">
        <h2>Welcome to Signup Page</h2>
        <p>
          Already have an account ? Click for{" "}
          <Link className="underline" to="/signin">
            Signin
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
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
          <ShowPassword>
            {(type) => (
              <input
                id="password"
                type={type}
                placeholder="******"
                className="py-1 font-medium outline w-full"
                {...register("password", {
                  required: "This is required",
                  minLength: { message: "Min length 6", value: 6 },
                })}
              />
            )}
          </ShowPassword>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p>{message}</p>}
          />
          <label className="font-medium text-xl mt-5 mb-5" htmlFor="rePassword">
            Password Again
          </label>
          <ShowPassword>
            {(type) => (
              <input
                id="rePassword"
                type={type}
                placeholder="******"
                className="py-1 font-medium outline w-full"
                {...register("rePassword", {
                  validate: (value) =>
                    value === password || "This password does not match.",
                  required: "This is required",
                  minLength: { message: "Min length ", value: 6 },
                })}
              />
            )}
          </ShowPassword>
          <ErrorMessage
            errors={errors}
            name="rePassword"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
        <div>
          <Button loading={loading}>SUBMIT</Button>
          <AutWithGoogle />
        </div>
      </form>
    </div>
  );
}
export default Signup;
