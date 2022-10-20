import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "components/pages/Home";
import Signup from "components/features/auth-user/signup/Signup";
import Signin from "components/features/auth-user/signin/Signin";
import UserProfile from "components/pages/userProfile/UserProfile";
import "react-toastify/dist/ReactToastify.css";
import RequireAuthRoute from "components/require-auth-route/RequireAuthRoute";

function App() {
  return (
    <div className="min-h-screen w-full ">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuthRoute>
              <Home />
            </RequireAuthRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user-profile"
          element={
            <RequireAuthRoute>
              <UserProfile />
            </RequireAuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
