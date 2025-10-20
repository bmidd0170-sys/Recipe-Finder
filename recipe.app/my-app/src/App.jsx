import { Routes, Route, Link } from "react-router-dom";
import Feedback from "./pages/Feedback";
import { MainPage } from "./Pages/Main-Page";
import { ResultsPage } from "./Pages/Results-page";
import Profile from "./Pages/Profile";
import { useProfile } from "./components/ProfileContext";
import SavedRecipes from "./pages/SavedRecieps";



export default function RecipeFinder() {
	const { profileImage } = useProfile(); // ✅ access shared image

  return (
		<div className="app container">
			<header className="header">
				<div className="brand">
					{/* Profile Link with Image */}
					<Link to="/profile" className="profile">
						<img
							src={profileImage} // ✅ shared state
							alt="Profile"
							className="profile-icon"
						/>
					</Link>
				</div>
				<div>
					<div>
						<span className="title">Recipe Finder</span>
						<span className="subtitle">Discover & cook smarter</span>
					</div>
				</div>

				<div className="top-actions">
					{/*Saved Recipes Link*/}
					<Link to="/saved-recipes" className="saved-recipes-link">
						Saved Recipes
					</Link>	
					{/* Feedback Button */}
					<Link to="/feedback" className="Feedback-button">
						Feedback
					</Link>
				</div>
			</header>

			{/* Main Page Routing */}
			<Routes>
				<Route path="/saved-recipes" element={<SavedRecipes />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/" element={<MainPage />} />
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/results" element={<ResultsPage />} />
			</Routes>

			{/* Footer */}
			<footer className="footer">
				<p>&copy; 2025 Recipe Finder. All rights reserved.</p>
			</footer>
		</div>
	);
}
