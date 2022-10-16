import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { errorToast, successToast } from "helpers";
import Home from "components/home/Home";
import Signup from "components/features/auth-user/signup/Signup";
import Signin from "components/features/auth-user/signin/Signin";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
