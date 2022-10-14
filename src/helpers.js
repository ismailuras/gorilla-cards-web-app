import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const successToast = () => {
  toast.success("Success!", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
    theme: "light",
    pauseOnHover: false,
  });
};

export const errorToast = () => {
  toast.error("Invalid email or password !", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
    theme: "colored",
    pauseOnHover: false,
  });
};
