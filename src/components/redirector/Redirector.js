import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
function Redirector() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/user-profile");
      } else {
        navigate("/home");
      }
    }
  }, [user, loading]);
  return null;
}

export default Redirector;
