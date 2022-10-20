import { auth } from "firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { showToast } from "helpers";

function UserProfile() {
  const navigate = useNavigate();

  const user = auth.currentUser;
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
      <h3 className="text-2xl">Profile Page</h3>
      <div className="p-10">
        {user !== null &&
          user.providerData.map((profile) => (
            <span className="text-xl" key={profile.uid}>
              Welcome {profile.email}
            </span>
          ))}
      </div>
      <button
        onClick={handleSignOut}
        className="bg-indigo-600 text-white text-md py-2 px-6 my-10 hover:bg-indigo-700 ml-3">
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
