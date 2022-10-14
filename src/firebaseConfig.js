import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBe777tCEme_o93lv1tzxxvbBFuHK0obNI",
  authDomain: "anki-like.firebaseapp.com",
  projectId: "anki-like",
  storageBucket: "anki-like.appspot.com",
  messagingSenderId: "928710057613",
  appId: "1:928710057613:web:1f791a11b30ab05f2eccc4",
  measurementId: "G-XPJLSE987Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
