import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "components/pages/Home";
import Navbar from "components/navbar/Navbar";
import Signup from "components/features/auth-user/signup/Signup";
import Signin from "components/features/auth-user/signin/Signin";
import CurrentUser from "components/pages/currentUser/CurrentUser";
import RequireAuthRoute from "components/require-auth-route/RequireAuthRoute";
import Redirector from "components/redirector/Redirector";
import RequireNotLogin from "components/require-not-login/RequireNotLogin";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Redirector />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/signup"
          element={
            <RequireNotLogin>
              <Signup />
            </RequireNotLogin>
          }
        />
        <Route
          path="/signin"
          element={
            <RequireNotLogin>
              <Signin />
            </RequireNotLogin>
          }
        />
        <Route
          path="/user-profile"
          element={
            <RequireAuthRoute>
              <CurrentUser />
            </RequireAuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
