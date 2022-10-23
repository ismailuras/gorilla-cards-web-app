import { auth } from "firebaseConfig";
import { signOut } from "firebase/auth";
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
    <div className="flex justify-around items-center p-10">
      {loading && (
        <div>
          <span>Initialising User</span>
        </div>
      )}
      {error && showToast("Unexpected error occured", "error")}
      {user && (
        <div>
          <span className="text-2xl">Welcome {user.email}</span>
        </div>
      )}
      <div>
        <button
          className="bg-indigo-600 hover:bg-indigo-400 mb-6 text-white p-2 rounded"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default CurrentUser;
