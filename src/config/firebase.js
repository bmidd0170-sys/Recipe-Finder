// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoSduYqNgNvXwtAB_1lcn3wNkpO_IEWos",
  authDomain: "recipe-finder-7a64a.firebaseapp.com",
  projectId: "recipe-finder-7a64a",
  storageBucket: "recipe-finder-7a64a.appspot.com",
  messagingSenderId: "808233739825",
  appId: "1:808233739825:web:9f9f9f9f9f9f9f9f9f9f9f"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

// Get Auth instance
const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Add scopes for Google OAuth
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// Configure provider settings
googleProvider.setCustomParameters({
  prompt: 'select_account',
  login_hint: 'user@example.com'
});

// Set language to browser's language
auth.languageCode = navigator.language || 'en';

// Enable local emulator if in development
if (import.meta.env.DEV) {
  try {
    connectAuthEmulator(auth, "http://localhost:9099");
  } catch (error) {
    console.error("Auth emulator connection error:", error);
  }
}

export { auth, googleProvider };
export default app;