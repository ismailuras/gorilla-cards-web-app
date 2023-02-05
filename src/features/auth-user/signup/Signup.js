import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { showToast } from "helpers";
import { signup } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock } from "react-feather";
import ShowPassword from "components/show-password/ShowPassword";
import AuthPageLayout from "./authpagelayout/AuthPageLayout";

import googleLogo from "assets/images/google-logo.webp";

const messages = {
  "auth/not-valid-email": "Invalid e-mail address.",
  "auth/user-already-exist": "This mail already exist.",
  "unexpected-error-occured": "Unexpected error occured!",
};

function Signup() {
  const errorMessagesOnSignup = useSelector(
    (state) => state.auth.errorMessagesOnSignup
  );
  const signUpStatus = useSelector((state) => state.auth.signUpStatus);

  const dispatch = useDispatch();
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
      repassword: "",
    },
  });

  const onSubmit = async ({ email, password, repassword }) => {
    await dispatch(signup({ email, password, repassword })).unwrap();
    showToast("You have been sign in succesfully.", "success");
    reset();
  };

  const passwordWatch = watch("password");

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container bg-white px-16">
        <div className="flex">
          <AuthPageLayout />
          <div className="w-1/3">
            <h3 className="text-2xl font-semibold mb-10">Be a Gorilla 🦍</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email"></label>
              <div className="relative mb-5">
                <Mail className="flex-none text-gray-300 h-6 w-6 left-4 top-4 absolute" />
                <input
                  name="email"
                  type="email"
                  className="h-14 w-full pl-14 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700"
                  placeholder="*  Email"
                  {...register("email", {
                    required: "This is a required field.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
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
                <label htmlFor="password"></label>
                <Lock className="flex-none text-gray-300 h-6 w-6 left-4 top-4 absolute" />
                <ShowPassword>
                  {(type) => (
                    <input
                      className="h-14 w-full pl-14 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg"
                      id="password"
                      type={type}
                      placeholder="*  Password"
                      {...register("password", {
                        required: "This is a required field.",
                        minLength: {
                          message:
                            "Your password must be at least six characters.",
                          value: 6,
                        },
                      })}
                    />
                  )}
                </ShowPassword>
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
              <div className="relative mb-5">
                <label htmlFor="repassword"></label>
                <Lock className="flex-none text-gray-300 h-6 w-6 left-4 top-4 absolute" />
                <ShowPassword>
                  {(type) => (
                    <input
                      id="repassword"
                      type={type}
                      placeholder="*  Password again"
                      className="h-14 w-full pl-14 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700"
                      {...register("repassword", {
                        validate: (value) =>
                          value === passwordWatch ||
                          "This password does not match.",
                        required: "This is a required field.",
                        minLength: {
                          message:
                            "Your password must be at least six characters.",
                          value: 6,
                        },
                      })}
                    />
                  )}
                </ShowPassword>
                <ErrorMessage
                  errors={errors}
                  name="repassword"
                  render={({ message }) => (
                    <div className="pl-1 pt-2 text-red-400 text-sm">
                      {message}
                    </div>
                  )}
                />
              </div>
              <div className="relative mb-5">
                {errorMessagesOnSignup.map((error) => (
                  <div key={error} className="pl-1 pt-2 text-red-400 text-sm">
                    {messages[error]}
                  </div>
                ))}
                <button
                  disabled={signUpStatus === "loading"}
                  type="submit"
                  className="w-full rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
                  <span>
                    {signUpStatus === "loading" ? "Loading..." : "Sign up"}
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
                  You already have an account ?
                  <Link
                    className="text-blue-500 hover:underline font-semibold ml-3"
                    to="/signin">
                    Signin
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
