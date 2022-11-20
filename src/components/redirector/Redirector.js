import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "useAuth";
function Redirector() {
  const isUserLoggedIn = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/decks");
    } else {
      navigate("/home");
    }
  }, [isUserLoggedIn, navigate]);
  return null;
}

export default Redirector;
