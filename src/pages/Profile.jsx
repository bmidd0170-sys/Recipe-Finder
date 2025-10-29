import { useProfile } from "../components/ProfileContext";
import { useAuth } from "../Context/AuthContext";
import RecentReciepsProfile from "../components/RecentRecieps-Profile";
import SavedReciepsProfile from "../components/SavedRecieps-Profile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSaves } from "../Context/RecipeSaves";
import { useRecentRecipes } from "../Context/RecentRecipesContext";

export default function Profile() {
	const { profileImage, setProfileImage, resetProfile } = useProfile();
	const { currentUser, logout } = useAuth();
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
		const placeholderImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

		if (!currentUser) {
			setUserProfile(emptyState);
			setProfileImage(placeholderImage);
			navigate("/login", { replace: true });
			return;
		}

		// Set user profile data when logged in
		setUserProfile({
			name: currentUser.displayName || "",
			email: currentUser.email || "",
			bio: "",
			utensils: ""
		});

		// Handle profile image
		if (!currentUser.photoURL) {
			setProfileImage(placeholderImage);
			return;
		}

		// Load profile image
		const img = new Image();
		img.onload = () => setProfileImage(currentUser.photoURL);
		img.onerror = () => setProfileImage(placeholderImage);
		img.src = currentUser.photoURL;

		return () => {
			// Cleanup
			img.onload = null;
			img.onerror = null;
		};
	}, [currentUser, navigate]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const imageDataUrl = reader.result;
				setProfileImage(imageDataUrl);
				// Store the custom profile image in localStorage
				localStorage.setItem('userProfileImage', imageDataUrl);
			};
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
						onError={(e) => {
							console.warn("Failed to load profile image, using placeholder");
							e.target.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
						}}
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
							// Reset all profile data
							setUserProfile({
								name: "",
								email: "",
								bio: "",
								utensils: "",
							});

							// Reset profile image using context function
							resetProfile();

							// Clear all recipes data from local storage
							localStorage.removeItem('recentRecipes');
							localStorage.removeItem('savedRecipes');

							// Clear recipe contexts
							clearAllSaves();
							clearAllRecent();
							
							// Sign out from Firebase
							await logout();
							
							// Navigate to login page and prevent going back
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
