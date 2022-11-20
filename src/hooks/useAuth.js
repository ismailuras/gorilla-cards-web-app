import { useSelector } from "react-redux";

function useAuth() {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return { isUserLoggedIn };
}

export default useAuth;
