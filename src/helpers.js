import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (text, status) => {
  toast[status](text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
    theme: "light",
    pauseOnHover: false,
  });
};
