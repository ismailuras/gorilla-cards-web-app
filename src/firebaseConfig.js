import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjeqkO0MtSgu9zsPB6VLe6ujcLPBy3bQA",
  authDomain: "wisecards-afcab.firebaseapp.com",
  projectId: "wisecards",
  storageBucket: "wisecards.appspot.com",
  messagingSenderId: "447247959639",
  appId: "1:447247959639:web:f97f07f5a3d522fb4b8512",
};

export const reAuth = async (currentPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPassword
  );
  await reauthenticateWithCredential(user, credential);
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
