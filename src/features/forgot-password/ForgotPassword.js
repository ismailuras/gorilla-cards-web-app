import { showToast } from "helpers";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { sendResetPasswordMail } from "features/auth-user/authSlice";
import { useSelector, useDispatch } from "react-redux";

const messages = {
  "auth/user-not-found": "Credentional is wrong. Please retry.",
  "unexpected-error-occured": "Unexpected error occured.",
};

function ForgotPassword({ onClose }) {
  const status = useSelector((state) => state.auth.status);
  const errorMessagesOnResetPassword = useSelector(
    (state) => state.auth.errorMessagesOnResetPassword
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }) => {
    await dispatch(sendResetPasswordMail({ email })).unwrap();
    showToast("Password reset mail sent successfully.", "success");
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
            required: "This is a required field.",
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
        {errorMessagesOnResetPassword.map((error) => (
          <span key={error} className="pl-1 pt-2 text-red-400 text-sm">
            {messages[error]}
          </span>
        ))}
        <button
          disabled={status === "loading"}
          className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
          {status === "loading" ? "Loading..." : "Send Reset Mail"}
        </button>
      </div>
    </form>
  );
}

export default ForgotPassword;
