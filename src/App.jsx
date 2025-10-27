import { Routes, Route, Link } from "react-router-dom";
import Feedback from "./pages/Feedback";
import MainPage from "./pages/MainPage";
import LoadingPage from "./pages/LoadingPage";
import Profile from "./pages/Profile";
import AdminFeedback from "./pages/AdminFeedback";
import { useProfile } from "./components/ProfileContext";
import SavedRecipes from "./pages/SavedRecieps";
import ResultsPage from "./pages/ResultsPage";
import Login from "./pages/Login";
import RecentRecieps from "./components/RecentRecieps-Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { RecentRecipesProvider } from "./Context/RecentRecipesContext";
import { SavesProvider } from "./Context/RecipeSaves";
import { AuthProvider } from "./Context/AuthContext";

export default function RecipeFinder() {
	const { profileImage } = useProfile(); // ✅ access shared image

	return (
		<AuthProvider>
			<SavesProvider>
				<RecentRecipesProvider>
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
							<Route path="/login" element={<Login />} />
							<Route
								path="/saved-recipes"
								element={
									<ProtectedRoute>
										<SavedRecipes />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>

							<Route path="/" element={<MainPage />} />
							<Route path="/loading" element={<LoadingPage />} />
							<Route path="/feedback" element={<Feedback />} />
							<Route path="/results" element={<ResultsPage />} />
							<Route path="/recent-recipes" element={<RecentRecieps />} />
							<Route
								path="/admin/feedback"
								element={
									<ProtectedRoute>
										<AdminFeedback />
									</ProtectedRoute>
								}
							/>
						</Routes>

						{/* Footer */}
						<footer className="footer">
							<p>&copy; 2025 Recipe Finder. All rights reserved.</p>
						</footer>
					</div>
				</RecentRecipesProvider>
			</SavesProvider>
		</AuthProvider>
	);
}
