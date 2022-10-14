import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Link } from "react-router-dom";
import { errorToast, successToast } from "helpers";
import Home from "components/home/Home";
import Signup from "components/features/auth-user/signup/Signup";
import Signin from "components/features/auth-user/signin/Signin";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const toastify = () => {
    successToast();
  };
  const errorTostify = () => {
    errorToast();
  };

  return (
    <div className="min-h-screen w-full ">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Signup success={toastify} error={errorTostify} />}
        />
        <Route
          path="/signin"
          element={<Signin success={toastify} error={errorTostify} />}
        />
      </Routes>
    </div>
  );
}

export default App;
