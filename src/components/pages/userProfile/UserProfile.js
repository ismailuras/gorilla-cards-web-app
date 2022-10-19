import { auth } from "firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { showToast } from "helpers";

function UserProfile() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.code.includes("auth/network-request-failed")) {
          showToast("Network request failed. Pleas try again.", "error");
          return;
        }
        return showToast("Unexpected error occured");
      });
  };
  return (
    <div>
      <h3>Welcome to Profile Page</h3>
      <div></div>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default UserProfile;
