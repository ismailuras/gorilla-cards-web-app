import { useForm } from "react-hook-form";
import { auth } from "firebaseConfig";
import { updateEmail } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { reAuth } from "firebaseConfig";
import { showToast } from "helpers";
import ShowPassword from "../showpassword/ShowPassword";
import Spinner from "../spinner/Spinner";

function UpdateEmail() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    email: "",
    currentPassword: "",
  });

  const onSubmit = async ({ email, currentPassword }) => {
    setLoading(true);
    const emails = user.providerData.map((profile) => profile.email);
    if (emails.includes(email)) {
      showToast("The email address you entered is already primary.", "error");
      return;
    }
    try {
      await reAuth(currentPassword);
      await updateEmail(user, email, currentPassword);
      reset();
      showToast("Email address has been successfully changed.", "success");
    } catch (error) {
      if (error.code.includes("auth/wrong-password")) {
        showToast("Wrong password. Try again.", "error");
        return;
      }
      if (error.code.includes("auth/invalid-email")) {
        showToast("Please enter a valid e-mail address.", "error");
        return;
      }
      if (error.code.includes("auth/network-request-failed")) {
        showToast("Network request failed. Pleas try again.", "error");
        return;
      }
      return showToast("Unexpected error occured. Try again", "error");
    } finally {
      setLoading(false);
    }

    // const currentEmail = user.providerData.map(
    //   (profile) => profile === profile.email
    // );
    // console.log(currentEmail);
    // if (email === currentEmail.value) {
    //   showToast("The email entered is already primary", "error");
    //   return;
    // }
  };

  return (
    <form
      className="w-96 h-60 flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="font-medium text-xl" htmlFor="email">
          Email
        </label>
        <input
          className="w-full p-1 px-2 outline border-solid mb-1"
          id="email"
          placeholder="example@mail.com"
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      <div>
        <label className="font-medium text-xl" htmlFor="currentPassword">
          Current Password
        </label>
        <ShowPassword>
          {(type) => (
            <input
              id="currentPassword"
              type={type}
              placeholder="******"
              className="py-1 font-medium outline w-full"
              {...register("currentPassword", {
                required: "This is required",
                minLength: { message: "Min length 6", value: 6 },
              })}
            />
          )}
        </ShowPassword>
        <ErrorMessage
          errors={errors}
          name="currentPassword"
          render={({ message }) => <p>{message}</p>}
        />
      </div>
      <button className="bg-indigo-600 p-1 mt-4 text-white text-xl rounded hover:bg-indigo-700">
        {loading ? <Spinner /> : " Update"}
      </button>
    </form>
  );
}

export default UpdateEmail;
