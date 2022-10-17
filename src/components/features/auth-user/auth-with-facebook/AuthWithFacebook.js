import { BsFacebook } from "react-icons/bs";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "firebaseConfig";
function AuthWithFacebook() {
  const facebookSignin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
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
