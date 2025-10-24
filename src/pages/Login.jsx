import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signInWithGoogle, setUser } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			setError("");
			setLoading(true);
			const loggedUser = await signInWithGoogle();
			setUser(loggedUser);
			navigate(-1); // Go back to the previous page
		} catch (error) {
			console.error("Sign-in error:", error);
			setError("Failed to sign in with Google: " + error.message);
		} finally {
			setLoading(false);
		}
	};
	async function handleGoogleSignIn() {
		try {
			setError("");
			setLoading(true);
			await signInWithGoogle();
			navigate(-1); // Go back to the previous page
		} catch (error) {
			console.error("Sign-in error:", error);
			if (error.code === "auth/unauthorized-domain") {
				setError(
					"This domain is not authorized. Please contact the administrator."
				);
			} else if (error.code === "auth/popup-blocked") {
				setError(
					"Please allow popups for this website to sign in with Google."
				);
			} else {
				setError("Failed to sign in with Google: " + error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="login-page">
			<div className="login-card">
				<h2>Sign In</h2>
				{error && <div className="error-text">{error}</div>}
				<div className="login-options">
					<button
						onClick={handleLogin}
						className="google-signin-button"
						disabled={loading}
					>
						
						{loading ? "Signing in..." : "Sign in with Google"}
					</button>
					<div className="or-divider">
						<span>or</span>
					</div>
					<Link to="/recent-recipes" className="skip-signin-button">
						Continue without signing in
					</Link>
				</div>
			</div>
		</div>
	);
}
