import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ShowPassword from "../show-password/ShowPassword";

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });

  const onSubmit = async () => {};

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
        Update
      </button>
    </form>
  );
}

export default UpdatePassword;
