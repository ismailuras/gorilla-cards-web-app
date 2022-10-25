import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { updatePassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { auth } from "firebaseConfig";
import { reAuth } from "firebaseConfig";
import { showToast } from "helpers";
import ShowPassword from "../showpassword/ShowPassword";
import Spinner from "../spinner/Spinner";

function UpdatePassword() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });

  const onSubmit = async ({ newPassword, currentPasswordForUpdate }) => {
    setLoading(true);
    try {
      await reAuth(currentPasswordForUpdate);
    } catch (error) {
      if (error.code.includes("auth/wrong-password")) {
        showToast("Wrong password. Try again.", "error");
        return;
      }
      return showToast("Unexpected error occured. Try again", "error");
    } finally {
      setLoading(false);
    }
    updatePassword(user, newPassword)
      .then(() => {
        reset();
        showToast("Password updated successfully.", "success");
      })
      .catch((error) => {
        if (error.code.includes("auth/network-request-failed")) {
          showToast("Network request failed. Pleas try again.", "error");
          return;
        }
        return showToast("Unexpected error occured. Try again", "error");
      });
  };

  const newPassword = watch("newPassword");

  return (
    <form
      className="w-96 h-72 flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="font-medium text-xl mb-10" htmlFor="newPassword">
          New Password
        </label>
        <ShowPassword>
          {(type) => (
            <input
              id="newPassword"
              type={type}
              placeholder="******"
              className="py-1 font-medium outline w-full"
              {...register("newPassword", {
                required: "This is required",
                minLength: { message: "Min length 6", value: 6 },
              })}
            />
          )}
        </ShowPassword>
      </div>
      <div>
        <label className="font-medium text-xl mb-10" htmlFor="rePassword">
          New Password (Again)
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
                  value === newPassword || "This password does not match.",
                required: "This is required",
                minLength: { message: "Min length 6", value: 6 },
              })}
            />
          )}
        </ShowPassword>
      </div>
      <ErrorMessage
        errors={errors}
        name="rePassword"
        render={({ message }) => <p>{message}</p>}
      />
      <div>
        <label
          className="font-medium text-xl mb-10"
          htmlFor="currentPasswordForUpdate">
          Current Password
        </label>
        <ShowPassword>
          {(type) => (
            <input
              id="currentPasswordForUpdate"
              type={type}
              placeholder="******"
              className="py-1 font-medium outline w-full"
              {...register("currentPasswordForUpdate", {
                required: "This is required",
                minLength: { message: "Min length 6 ", value: 6 },
              })}
            />
          )}
        </ShowPassword>
        <ErrorMessage
          errors={errors}
          name="currentPasswordForUpdate"
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      <button className="bg-indigo-600 p-1 mt-4 text-white text-xl rounded hover:bg-indigo-700">
        {loading ? <Spinner /> : "Update"}
      </button>
    </form>
  );
}

export default UpdatePassword;
