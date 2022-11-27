import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (text, status) => {
  const toaster = toast[status];
  toaster(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: "light",
    pauseOnHover: false,
  });
};

export const mdToStr = (str = "") => {
  let newStr = str.replace(/ `!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?~]/, "");
  if (newStr.length > 10) {
    newStr = `${newStr.slice(0, 50)}`;
  }
  return newStr;
};
