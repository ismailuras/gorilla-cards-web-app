import { auth } from "firebaseConfig";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "helpers";
import { useState } from "react";
import ShowPassword from "components/features/showpassword/ShowPassword";
import Button from "components/Button";
import AutWithGoogle from "../auth-with-google/AuthWithGoogle";
import MyModal from "components/features/modal/MyModal";
import ForgotPassword from "components/features/forgot-password/ForgotPassword";

function Signin() {
  const common = [
    "text-white text-xl p-2 rounded bg-indigo-600 hover:bg-indigo-500",
  ];

  const [loading, isLoading] = useState(false);
  const [isForgotModalOpen, setForgotModalOpen] = useState(false);
  const navigate = useNavigate();

  const openForgotModal = () => {
    setForgotModalOpen(true);
  };

  const handleCloseForgotModal = () => {
    setForgotModalOpen(false);
  };

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

  const onSubmit = async ({ email, password }) => {
    isLoading(true);
    await setPersistence(auth, browserLocalPersistence);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        reset();
        showToast("You have been sign in succesfully.", "success");
        isLoading(false);
        navigate("/user-profile");
      })
      .catch((error) => {
        isLoading(false);
        if (error.code.includes("auth/wrong-password")) {
          showToast("Password is incorrect. Try again.", "error");
          return;
        }
        if (error.code.includes("auth/email-already-in-use")) {
          showToast("Email already in use", "error");
          return;
        }
        if (error.code.includes("auth/user-not-found")) {
          showToast("User not found. First signup !", "error");
          return;
        }
        return showToast("Unexpected error occured", "error");
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
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
          <Button loading={loading}>Signin</Button>
          <AutWithGoogle />
          <button
            onClick={openForgotModal}
            className={common.join(" ")}
            type="button">
            Forgot Password
          </button>
        </div>
      </form>
      <MyModal
        isOpen={isForgotModalOpen}
        setOpen={setForgotModalOpen}
        title="Forgot Password">
        <ForgotPassword onClose={handleCloseForgotModal} />
      </MyModal>
    </div>
  );
}

export default Signin;
