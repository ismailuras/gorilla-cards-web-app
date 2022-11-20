import { showToast } from "helpers";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import axios from "axios";

function ForgotPassword({ onClose }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }) => {
    setLoading(true);
    axios
      .put("/auth/forgot", {
        email,
      })
      .then(() => {
        showToast(
          "Password reset email has been sent. Please check.(Also check spam.)",
          "success"
        );
        onClose();
        return;
      })
      .catch((error) => {
        if (error.code.includes("auth/invalid-email")) {
          showToast("Invalid email. Pleas check.", "error");
          return;
        }
        setLoading(false);
        return showToast("Unexpected error occured", "error");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="email" className="font-semibold mb-3 block">
          Please enter a registered e-mail address.
        </label>
        <input
          id="email"
          className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
          placeholder="example@mail.com"
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
          render={({ message }) => (
            <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
          )}
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={loading}
          className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
          {loading ? "Loading..." : "Send reset email"}
        </button>
      </div>
    </form>
  );
}

export default ForgotPassword;
