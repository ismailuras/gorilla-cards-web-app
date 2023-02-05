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
import AuthPageLayout from "../signup/authpagelayout/AuthPageLayout";
import styles from "./signin.module.css";

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
      <div className={styles.signinContent}>
        <div className={styles.layout}>
          <AuthPageLayout />
          <div className={styles.inclusive}>
            <h3 className={styles.header}>Welcome back Gorilla 🦍</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formContent}>
                <label htmlFor="email"></label>
                <Mail className={styles.formIcons} />
                <input
                  type="email"
                  className={styles.formInputs}
                  placeholder="*  Email"
                  {...register("email", {
                    required: "This is a required field.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <div className={styles.errorMessages}>{message}</div>
                  )}
                />
              </div>
              <div className={styles.passwordField}>
                <Lock className={styles.formIcons} />
                <label htmlFor="password"></label>
                <ShowPassword>
                  {(type) => (
                    <input
                      className={styles.formInputs}
                      id="password"
                      type={type}
                      placeholder="*  Password"
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
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <div className={styles.errorMessages}>{message}</div>
                  )}
                />
              </div>
              <div className={styles.forgotPassword}>
                <button
                  onClick={openForgotModal}
                  type="button"
                  className={styles.forgotPasswordBtn}>
                  Forgot password ?
                </button>
              </div>
              {errorMessagesOnSignin.map((error) => (
                <div key={error} className={styles.errorMessages}>
                  {messages[error]}
                </div>
              ))}
              <div className={styles.signinField}>
                <button
                  disabled={signInStatus === "loading"}
                  type="submit"
                  className="w-full rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
                  <span>
                    {signInStatus === "loading" ? "Loading..." : "Sign in"}
                  </span>
                </button>
              </div>
              <div className={styles.option}>
                <hr className="grow" />
                <span className={styles.optionSpan}> or </span>
                <hr className="grow" />
              </div>
              <div className="mb-6">
                <button type="button" className={styles.signinBtnWithGoogle}>
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
                  <Link className={styles.signupLink} to="/signup">
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
