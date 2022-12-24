import { useForm } from "react-hook-form";
import { Mail, Lock } from "react-feather";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { showToast } from "helpers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../authSlice";
import ShowPassword from "components/show-password/ShowPassword";
import MyModal from "components/MyModal";
import ForgotPassword from "features/forgot-password/ForgotPassword";
import AuthPageLayout from "../AuthPageLayout";

import googleLogo from "assets/images/google-logo.webp";

const messages = {
  "auth/user-not-found": "Credentional is wrong. Please retry.",
  "unexpected-error-occured": "Unexpected error occured.",
};

function Signin() {
  const [isForgotModalOpen, setForgotModalOpen] = useState(false);
  const signInStatus = useSelector((state) => state.auth.signInStatus);
  const errorMessagesOnSignin = useSelector(
    (state) => state.auth.errorMessagesOnSignin
  );
  const dispatch = useDispatch();

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
    await dispatch(signin({ email, password })).unwrap();
    showToast("You have been successfully signed in.", "success");
    reset();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container bg-white px-16">
        <div className="flex">
          <AuthPageLayout />
          <div className="w-1/3">
            <h3 className="text-2xl font-semibold mb-10">
              Welcome back Gorilla 🦍
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-5">
                <label htmlFor="email"></label>
                <Mail className="flex-none text-gray-300 h-6 w-6 left-4 top-4 absolute" />
                <input
                  type="email"
                  className="h-14 w-full pl-14 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700"
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="*  Email"
                  {...register("email", {
                    required: "This is a required field.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span role="alert">This is a required field.</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span role="alert">"Invalid email address."</span>
                )}
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <div className="pl-1 pt-2 text-red-400 text-sm">
                      {message}
                    </div>
                  )}
                />
              </div>
              <div className="relative mb-5">
                <Lock className="flex-none text-gray-300 h-6 w-6 left-4 top-4 absolute" />
                <label htmlFor="password"></label>
                <ShowPassword>
                  {(type) => (
                    <input
                      className="h-14 w-full pl-14 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg"
                      id="password"
                      type={type}
                      placeholder="*  Password"
                      aria-invalid={errors.password ? "true" : "false"}
                      {...register("password", {
                        required: "This is a required field.",
                        minLength: {
                          message:
                            " Your password must be at least six characters.",
                          value: 6,
                        },
                      })}
                    />
                  )}
                </ShowPassword>
                {errors.password && errors.password.type === "required" && (
                  <span role="alert">This is a required field.</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span role="alert">
                    Your password must be at least six characters.
                  </span>
                )}
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <div className="pl-1 pt-2 text-red-400 text-sm">
                      {message}
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-end mb-5">
                <button
                  onClick={openForgotModal}
                  type="button"
                  className="font-semibold text-sm text-blue-500 hover:underline">
                  Forgot password?
                </button>
              </div>
              {errorMessagesOnSignin.map((error) => (
                <div key={error} className="pl-1 pt-2 text-red-400 text-sm">
                  {messages[error]}
                </div>
              ))}
              <div className="relative mb-5">
                <button
                  disabled={signInStatus === "loading"}
                  type="submit"
                  className="w-full rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
                  <span>
                    {signInStatus === "loading" ? "Loading..." : "Sign in"}
                  </span>
                </button>
              </div>
              <div className="flex items-center mb-5">
                <hr className="grow" />
                <span className="flex-none px-5 text-gray-400"> or </span>
                <hr className="grow" />
              </div>
              <div className="mb-6">
                <button
                  type="button"
                  className="w-full rounded-lg h-14 bg-white hover:bg-gray-200 transition border-2 text-gray-700 font-semibold mb-3">
                  <img
                    className="h-6 inline mr-3"
                    src={googleLogo}
                    alt="Google"
                  />
                  <span>Sign in with Google (Coming soon)</span>
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Don't have an account ?
                  <Link
                    className="text-blue-500 hover:underline font-semibold ml-3"
                    to="/signup">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
            <MyModal
              isOpen={isForgotModalOpen}
              setOpen={setForgotModalOpen}
              title="Forgot Password">
              <ForgotPassword onClose={handleCloseForgotModal} />
            </MyModal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
