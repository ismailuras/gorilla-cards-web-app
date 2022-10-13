import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "components/button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toastify = () =>
    toast("Success!", {
      toastifyValues,
    });

  const errorTostify = () =>
    toast("Invalid email or password", {
      toastifyValues,
    });

  const onSubmit = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toastify();
        setTimeout(() => {
          navigate("/");
        }, 1500);
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
            placeholder="example@mail.com"
            className="py-1 font-medium outline"
            {...register("email", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.email ? <p>This is reqired</p> : ""}
        </div>
        <div className="flex flex-col py-2">
          <label className="font-medium text-xl mb-5">Password</label>
          <input
            type="password"
            placeholder="******"
            className="py-1 font-medium outline"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password ? <p>Min six characters</p> : ""}
        </div>
        <Button>SUBMIT</Button>
      </form>
    </div>
  );
}

export default Signup;
