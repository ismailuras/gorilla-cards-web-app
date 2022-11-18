import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuthRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={"/"} />;
}

export default RequireAuthRoute;
