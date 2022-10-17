import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { showToast } from "helpers";

function AutWithGoogle() {
  const googleSignin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        showToast("You have signed up successfully", "success");
      })
      .catch((error) => {
        if (error.code.includes("auth/network-request-failed")) {
          showToast("Network request failed. Please try again.", "error");
          return;
        }
        if (error.code.includes("auth/email-already-in-use")) {
          showToast(
            "This email belongs to an account that already exists.",
            "error"
          );
          return;
        }
        return showToast("Unexpected error occured");
      });
  };

  return (
    <div>
      <button
        type="button"
        className="py-2 px-6 mb-2  rounded bg-red-300 flex items-center text-black font-serif"
        onClick={googleSignin}>
        <FcGoogle className="mr-2" /> Signin With Google
      </button>
    </div>
  );
}

export default AutWithGoogle;
