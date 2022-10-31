import { showToast } from "helpers";
import { auth } from "firebaseConfig";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendPasswordResetEmail } from "firebase/auth";
import Spinner from "components/features/spinner/Spinner";
import { useState } from "react";

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
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showToast(
          "Password reset email has been sent. Please check.(Also check spam.)",
          "success"
        );
        setLoading(false);
        onClose();
        return;
      })
      .catch((error) => {
        if (error.code.includes("auth/invalid-email")) {
          showToast("Invalid email. Pleas check.", "error");
          return;
        }
        return showToast("Unexpected error occured", "error");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96 h-72 flex flex-col justify-center">
      <label className="font-medium text-xl mb-10" htmlFor="email">
        Please enter a registered e-mail address.
      </label>
      <input
        id="email"
        className="w-full p-1 px-2 outline border-solid"
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
        render={({ message }) => <p>{message}</p>}
      />
      <button className="bg-indigo-600 p-1 mt-5 text-white text-xl rounded hover:bg-indigo-700">
        {loading ? <Spinner /> : "Send reset email."}
      </button>
    </form>
  );
}

export default ForgotPassword;
