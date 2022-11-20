import { Navigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

function RequireNotLogin({ children }) {
  const { isUserLoggedIn } = useAuth();
  return !isUserLoggedIn ? children : <Navigate to={"/decks"} />;
}

export default RequireNotLogin;
