import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import Button from "components/button/Button";

function Signin() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toastifyValues = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const toastify = () =>
    toast("Success!", {
      toastifyValues,
    });

  const errorTostify = () =>
    toast("Invalid email or password", {
      toastifyValues,
    });

  const onSubmit = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toastify();
      })
      .catch(() => {
        errorTostify();
      });
  };
  return (
    <div className="max-w-[700px] mx-auto my-16 p-4 ">
      <ToastContainer />
      <div className="p-2 text-bold text-center text-3xl">
        <h2>Welcome to Signup Page</h2>
      </div>
      <form className="flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-2">
          <label className="font-medium text-xl mb-5">Email</label>
          <input
            type="email"
            className="py-1 font-medium outline"
            defaultValue="test"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email ? <p>This is reqired</p> : ""}
        </div>
        <div className="flex flex-col py-2">
          <label className="font-medium text-xl mb-5">Password</label>
          <input
            type="password"
            className="py-1 font-medium outline"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password ? <p>Min six characters</p> : ""}
        </div>
        <Button>Click for</Button>
      </form>
    </div>
  );
}

export default Signin;
