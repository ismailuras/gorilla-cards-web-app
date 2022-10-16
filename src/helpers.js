import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (text, status) => {
  const toaster = toast[status];
  toaster(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    theme: "light",
    pauseOnHover: false,
  });
};
