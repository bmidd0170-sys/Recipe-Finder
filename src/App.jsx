import { Routes, Route, Link } from "react-router-dom";
import Feedback from "./pages/Feedback";
import MainPage from "./pages/Main-Page";
import Profile from "./pages/Profile";
import { useProfile } from "./components/ProfileContext";
import SavedRecipes from "./pages/SavedRecieps";
import ResultsPage from "./pages/Results-page";


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
					  <button className="Title-button">
						  <Link to="/" className="home-link">
							  <span className="title">Recipe Finder</span>
							  <span className="subtitle"> Discover & cook smarter</span>
						  </Link>
						</button>
					</div>
				</div>

				<div className="top-actions">
					{/*Saved Recipes Link*/}
					<Link to="/saved-recipes" className="saved-recipes-link">
						Saved Recipes
					</Link>
					{/* Results Link */}
					<Link to="/results" className="results-link">
						Results
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
