import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
function Redirector() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/user-profile");
    } else {
      navigate("/home");
    }
  }, [user]);
  return null;
}

export default Redirector;
