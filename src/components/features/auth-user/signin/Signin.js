import { auth } from "firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { showToast } from "helpers";
import ShowPassword from "components/features/showpassword/ShowPassword";
import Button from "components/Button";
import AutWithGoogle from "../auth-with-google/AuthWithGoogle";
import AuthWithFacebook from "../auth-with-facebook/AuthWithFacebook";

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        reset();
        showToast("You have been sign in succesfully.", "success");
        setIsLoading(false);
        navigate("/user-profile");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code.includes("auth/wrong-password")) {
          showToast("Password is incorrect. Try again.", "error");
          return;
        }
        if (error.code.includes("auth/user-not-found")) {
          showToast("User not found. First signup !", "error");
          return;
        }
        return showToast("Unexpected error occured");
      });
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
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
          <ShowPassword>
            {(type) => (
              <input
                id="password"
                type={type}
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
        </div>
        <div>
          <Button isLoading={isLoading}>Signin</Button>
          <AutWithGoogle />
          <AuthWithFacebook />
        </div>
      </form>
    </div>
  );
}

export default Signin;
