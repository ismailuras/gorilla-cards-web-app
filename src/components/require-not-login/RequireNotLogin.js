import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireNotLogin({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return !isLoggedIn ? children : <Navigate to={"/decks"} />;
}

export default RequireNotLogin;
