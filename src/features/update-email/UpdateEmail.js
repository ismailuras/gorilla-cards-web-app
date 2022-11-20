import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ShowPassword from "../../components/show-password/ShowPassword";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="font-semibold mb-3 block" htmlFor="email">
          New Email
        </label>
        <input
          className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
          id="email"
          placeholder="example@mail.com"
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
            <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
          )}
        />
        <label className="font-semibold mb-3 block" htmlFor="currentPassword">
          Current Password
        </label>
        <div className="relative">
          <ShowPassword>
            {(type) => (
              <input
                className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
                id="currentPassword"
                type={type}
                placeholder="New Password"
                {...register("currentPassword", {
                  required: "This is a required field.",
                  minLength: { message: "Min length 6", value: 6 },
                })}
              />
            )}
          </ShowPassword>
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name="currentPassword"
        render={({ message }) => (
          <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
        )}
      />
      <div className="flex justify-end">
        <button className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
          Update Email
        </button>
      </div>
    </form>
  );
}

export default UpdateEmail;
