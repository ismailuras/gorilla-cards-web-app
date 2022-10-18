import { BsFacebook } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "firebaseConfig";
import { showToast } from "helpers";

function AuthWithFacebook() {
  const facebookSignin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(() => {
        showToast("You have signed up successfully", "success");
      })
      .catch((error) => {
        if (error.code.includes("auth/network-request-failed")) {
          showToast("Network request failed. Please try again.", "error");
          return;
        }
        if (
          error.code.includes("auth/account-exists-with-different-credential")
        ) {
          showToast(
            "This e-mail address is already registered. Try logging in.",
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
        className="py-2 px-6  rounded bg-red-300 flex items-center text-black font-serif"
        onClick={facebookSignin}>
        <BsFacebook className="mr-2 text-blue-700" /> Signin With Facebook
      </button>
    </div>
  );
}

export default AuthWithFacebook;
