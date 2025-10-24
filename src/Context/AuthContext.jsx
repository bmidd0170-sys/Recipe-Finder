import { createContext, useContext, useState, useEffect } from "react";
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	setPersistence,
	browserLocalPersistence
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	async function signInWithGoogle() {
		try {
			// Set persistence to LOCAL
			await setPersistence(auth, browserLocalPersistence);
			
			// Attempt sign in
			const result = await signInWithPopup(auth, googleProvider);
			
			// Log success
			console.log("Successfully signed in with Google");
			return result;
		} catch (error) {
			console.error("Google sign in error:", error);
			
			// Handle specific error cases
			switch (error.code) {
				case 'auth/popup-closed-by-user':
					throw new Error('Sign-in window was closed before completion.');
				case 'auth/unauthorized-domain':
					console.error("Current domain:", window.location.origin);
					throw new Error('This domain is not authorized. Please ensure you\'re accessing from the correct URL.');
				case 'auth/cancelled-popup-request':
					throw new Error('Another sign-in attempt is in progress.');
				case 'auth/popup-blocked':
					throw new Error('Sign-in popup was blocked by the browser. Please enable popups for this site.');
				default:
					throw new Error(`Authentication failed: ${error.message}`);
			}
		}
	}

	function logout() {
		return signOut(auth);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signInWithGoogle,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
