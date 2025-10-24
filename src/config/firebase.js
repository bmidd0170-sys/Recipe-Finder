// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoSduYqNgNvXwtAB_1lcn3wNkpO_IEWos",
  authDomain: "littlechef-167a1.firebaseapp.com",
  projectId: "littlechef-167a1",
  storageBucket: "littlechef-167a1.firebasestorage.app",
  messagingSenderId: "825832087817",
  appId: "1:825832087817:web:79806eff800ed2f47c33d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Default export for the firebase configuration
export default { auth, db, googleProvider, signInWithGoogle };