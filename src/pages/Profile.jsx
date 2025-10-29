import { useProfile } from "../components/ProfileContext";
import { useAuth } from "../Context/AuthContext";
import RecentReciepsProfile from "../components/RecentRecieps-Profile";
import SavedReciepsProfile from "../components/SavedRecieps-Profile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSaves } from "../Context/RecipeSaves";
import { useRecentRecipes } from "../Context/RecentRecipesContext";

export default function Profile() {
	const { profileImage, setProfileImage } = useProfile();
	const { currentUser, signOut } = useAuth();
	const navigate = useNavigate();
	const { clearAllSaves } = useSaves();
	const { clearAllRecent } = useRecentRecipes();
	const [userProfile, setUserProfile] = useState({
		name: "",
		email: "",
		bio: "",
		utensils: "",
	});

	// Initial empty state
	const emptyState = {
		name: "",
		email: "",
		bio: "",
		utensils: "",
	};

	useEffect(() => {
		if (currentUser) {
			// Set user profile data when logged in
			setUserProfile((prev) => ({
				...prev,
				name: currentUser.displayName || "",
				email: currentUser.email || "",
			}));

			// Handle profile image
			const loadProfileImage = async () => {
				if (currentUser.photoURL) {
					try {
						// Fetch the image to ensure it's accessible
						const response = await fetch(currentUser.photoURL);
						if (response.ok) {
							setProfileImage(currentUser.photoURL);
						} else {
							console.warn("Could not load Google profile image");
						}
					} catch (error) {
						console.error("Error loading Google profile image:", error);
					}
				}
			};

			loadProfileImage();
		} else {
			// Reset to empty state when no user is logged in
			setUserProfile(emptyState);
			setProfileImage("https://cdn-icons-png.flaticon.com/512/847/847969.png");
			navigate("/login", { replace: true });
		}
	}, [currentUser, setProfileImage, navigate]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setProfileImage(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const handleBioChange = (e) => {
		setUserProfile((prev) => ({
			...prev,
			bio: e.target.value,
		}));
	};

	const handleUtensilsChange = (e) => {
		setUserProfile((prev) => ({
			...prev,
			utensils: e.target.value,
		}));
	};

	return (
		<div className="profile-page">
			<section className="profile-sidebar">
				<div className="profile-image">
					<img
						src={profileImage}
						alt="Profile"
						style={{ width: "120px", height: "120px", borderRadius: "50%" }}
					/>
				</div>

				<label className="pfp-text">
					Choose profile image
					<input
						type="file"
						onChange={handleImageChange}
						style={{ display: "none" }}
						accept="image/*"
					/>
				</label>

				<div className="profile-name-section">
					<label>Profile Name:</label>
					<input
						type="text"
						className="profile-name-input"
						value={userProfile.name}
						onChange={(e) => {
							setUserProfile((prev) => ({
								...prev,
								name: e.target.value,
							}));
						}}
						placeholder="Enter your name..."
					/>
				</div>

				<div className="profile-description">
					<label>Profile Description:</label>
					<textarea
						placeholder="Write a short bio..."
						value={userProfile.bio}
						onChange={handleBioChange}
					/>
				</div>

				<div className="profile-form">
					<textarea
						placeholder="Utensils being used..."
						className="utensils-input"
						value={userProfile.utensils}
						onChange={handleUtensilsChange}
					/>
				</div>

				<button
					className="sign-out-button"
					onClick={async () => {
						try {
							// Clear all user data including profile name
							setUserProfile({
								name: "",
								email: "",
								bio: "",
								utensils: "",
							});

							// Set the placeholder profile image
							setProfileImage(
								"https://cdn-icons-png.flaticon.com/512/847/847969.png"
							);

							// Clear all saved and recent recipes from both storage and state
							clearAllSaves();
							clearAllRecent();

							// Sign out immediately
							await signOut();

							// Redirect to login page
							navigate("/login", { replace: true });
						} catch (error) {
							console.error("Error signing out:", error);
						}
					}}
				>
					Sign Out
				</button>
			</section>

			<RecentReciepsProfile />
			<SavedReciepsProfile />
		</div>
	);
}
