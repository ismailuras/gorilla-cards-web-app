import Button from "components/Button";
import { userLogout } from "features/auth-user/authSlice";
import { useDispatch } from "react-redux";
function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default Logout;
