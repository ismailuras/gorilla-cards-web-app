import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ShowPassword from "../../components/show-password/ShowPassword";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="font-semibold mb-3 block" htmlFor="newPassword">
          New Password
        </label>
        <div className="relative">
          <ShowPassword>
            {(type) => (
              <input
                className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
                id="newPassword"
                type={type}
                placeholder="New Password"
                {...register("newPassword", {
                  required: "This is a required field.",
                  minLength: { message: "Min length 6", value: 6 },
                })}
              />
            )}
          </ShowPassword>
        </div>
        <label className="font-semibold mb-3 block" htmlFor="rePassword">
          New Password (Again)
        </label>
        <div className="relative">
          <ShowPassword>
            {(type) => (
              <input
                className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
                id="rePassword"
                type={type}
                placeholder="Re-Password"
                {...register("rePassword", {
                  validate: (value) =>
                    value === newPassword || "This password does not match.",
                  required: "This is a required field.",
                  minLength: { message: "Min length 6", value: 6 },
                })}
              />
            )}
          </ShowPassword>
        </div>
        <ErrorMessage
          errors={errors}
          name="rePassword"
          render={({ message }) => (
            <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
          )}
        />
        <label
          className="font-semibold mb-3 block"
          htmlFor="currentPasswordForUpdate"
        >
          Current Password
        </label>
        <div className="relative">
          <ShowPassword>
            {(type) => (
              <input
                className="h-14 w-full px-4 border-2 bg-gray-50 focus:bg-white outline-none rounded-lg font-medium text-gray-700 disabled:opacity-50"
                id="currentPasswordForUpdate"
                type={type}
                placeholder="Current Password"
                {...register("currentPasswordForUpdate", {
                  required: "This is a required field.",
                  minLength: { message: "Min length 6 ", value: 6 },
                })}
              />
            )}
          </ShowPassword>
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name="currentPasswordForUpdate"
        render={({ message }) => (
          <div className="pl-1 pt-2 text-red-400 text-sm">{message}</div>
        )}
      />
      <div className="flex justify-end">
        <button className="px-5 rounded-lg h-14 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold">
          Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePassword;
