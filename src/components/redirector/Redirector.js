import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Redirector() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/decks");
    } else {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);
  return null;
}

export default Redirector;
