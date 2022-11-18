import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ShowPassword from "../show-password/ShowPassword";

function UpdateEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    currentPassword: "",
  });

  const onSubmit = async () => {};

  return (
    <form
      className="w-96 h-60 flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="font-medium text-xl" htmlFor="email">
          New Email
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
        Update
      </button>
    </form>
  );
}

export default UpdateEmail;
