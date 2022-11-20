import { userLogout } from "features/auth-user/authSlice";
import { useDispatch } from "react-redux";
function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div>
      <button
        className="bg-red-500 p-1 rounded text-white font-medium mr-5 "
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
