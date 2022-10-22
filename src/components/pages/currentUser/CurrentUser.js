import { auth } from "firebaseConfig";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { showToast } from "helpers";
import { useAuthState } from "react-firebase-hooks/auth";

function CurrentUser() {
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth).catch(() => {
      return showToast("Unexpected error occured", "error");
    });
  };

  return (
    <div>
      {loading && (
        <div>
          <span>Initialising User</span>
        </div>
      )}
      {error && showToast("Unexpected error occured", "error")}
      {user && (
        <div>
          <span>Welcome {user.email}</span>
        </div>
      )}
      <div>
        <Link to={"/home"}>Home</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default CurrentUser;
