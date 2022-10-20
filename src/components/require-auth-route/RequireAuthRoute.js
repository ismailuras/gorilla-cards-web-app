import { Navigate } from "react-router-dom";
import { auth } from "firebaseConfig";

function RequireAuthRoute({ children }) {
  const user = auth.currentUser;

  return user ? children : <Navigate to="/signin" />;
}

export default RequireAuthRoute;
