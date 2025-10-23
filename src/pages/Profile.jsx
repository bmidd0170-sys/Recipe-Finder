import { useProfile } from "../components/ProfileContext";
import RecentReciepsProfile from "../components/RecentRecieps-Profile";
import SavedReciepsProfile from "../components/SavedRecieps-Profile";

export default function Profile() {
	const { profileImage, setProfileImage } = useProfile();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setProfileImage(reader.result);
			reader.readAsDataURL(file);
		}
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

				<input type="file" onChange={handleImageChange} className="pfp-text" />

				<div className="profile-description">
					<label>Profile Description:</label>
					<textarea placeholder="Write a short bio..." />
				</div>

				<div className="profile-form">
					
					<textarea
						placeholder="Utensils being used..."
						className="utensils-input"
					/>
				</div>
			</section>



		<RecentReciepsProfile />
		<SavedReciepsProfile />	
		</div>
	);
}
