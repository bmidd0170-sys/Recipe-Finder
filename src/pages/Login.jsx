import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	async function handleGoogleSignIn() {
		try {
			setError("");
			setLoading(true);
			await signInWithGoogle();
			navigate(-1); // Go back to the previous page
		} catch (error) {
			setError("Failed to sign in with Google: " + error.message);
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
						onClick={handleGoogleSignIn}
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
