import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateRecipe } from "../hook/useGenerateRecipe";
import { useRecentRecipes } from "../Context/RecentRecipesContext";
import { useSaves } from "../Context/RecipeSaves";
import { findSimilarRecipe } from "../utils/recipeUtils";
import LoadingScreen from "../components/LoadingScreen";
import { topSearches, userFeedback } from "../data/mockData";
import "./MainPage.css";

export default function MainPage() {
	const navigate = useNavigate();
	const { mutateAsync, isLoading: loading, error } = useGenerateRecipe();
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const { recentRecipes } = useRecentRecipes();
	const { saves } = useSaves();
	const [foundSimilar, setFoundSimilar] = useState(null);
	// Track filter checkboxes so we can send them to the OpenAI call
	const [filters, setFilters] = useState({
		vegetarian: false,
		vegan: false,
		glutenFree: false,
		otherEnabled: false,
		otherText: "",
	});

	const handleFileSelect = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setFile(file);
			setImage(URL.createObjectURL(file));
		}
	};

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = "copy";
		setIsDragging(true);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile && droppedFile.type.startsWith("image/")) {
			setFile(droppedFile);
			setImage(URL.createObjectURL(droppedFile));
		}
	};

	const handleSubmit = async () => {
		if (!file) return alert("Please upload an image first!");

		// Check for similar recipes first
		const similarRecipe = findSimilarRecipe(
			image,
			filters,
			recentRecipes,
			saves
		);

		if (similarRecipe) {
			setFoundSimilar(similarRecipe);
			return; // Don't proceed with generation if we found a similar recipe
		}

		try {
			const aiText = await mutateAsync({ file, filters });
			navigate("/results", { state: { image, aiText, filters } });
		} catch (e) {
			// error is available from the hook
			console.error("Generation failed", e);
		}
	};

	const renderStars = (rating) => {
		return "★".repeat(rating) + "☆".repeat(5 - rating);
	};

	return (
		<div className="main">
			{loading && <LoadingScreen />}
			{/* Top Searches Section */}
			<section className="top-searches">
				<h2>Trending Recipes</h2>
				{topSearches.map((item) => (
					<div key={item.id} className="search-item">
						<img src={item.imageUrl} alt={item.name} />
						<div className="search-item-info">
							<div className="search-item-name">{item.name}</div>
							<div className="search-count">{item.searchCount} searches</div>
						</div>
					</div>
				))}
			</section>

			{/* Main Upload Section */}
			<aside className="sidebar">
				<h3>Upload Dish</h3>
				<div
					className={`upload-area ${isDragging ? "dragging" : ""}`}
					onDragEnter={handleDragEnter}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					{image ? (
						<img src={image} alt="Preview" className="image-preview" />
					) : (
						<div className="upload-content">
							<label htmlFor="fileUpload" className="btn-upload">
								Choose File
								<input
									type="file"
									id="fileUpload"
									style={{ display: "none" }}
									accept="image/*"
									onChange={handleFileSelect}
								/>
							</label>
						</div>
					)}
				</div>

				{foundSimilar ? (
					<div className="similar-recipe-alert">
						<p>We found a similar recipe with matching filters!</p>
						<div className="similar-recipe-actions">
							<button
								className="similar-btn"
								onClick={() =>
									navigate("/results", {
										state: {
											image,
											aiText: foundSimilar.aiText,
											filters: foundSimilar.filters,
										},
									})
								}
							>
								Use Similar Recipe
							</button>
							<button
								className="similar-btn secondary"
								onClick={() => {
									setFoundSimilar(null);
									mutateAsync({ file, filters }).then((aiText) => {
										navigate("/results", { state: { image, aiText, filters } });
									});
								}}
							>
								Generate New Recipe
							</button>
						</div>
					</div>
				) : (
					<>
						<button
							className="submit-btn"
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? "Generating..." : "Generate Recipe"}
						</button>

						{error && <p className="error-text">Error: {error.message}</p>}
					</>
				)}

				<h3 style={{ marginTop: "16px" }}>Filters</h3>
				<div className="filters">
					<div className="filter-row">
						<input
							type="checkbox"
							id="veg"
							checked={filters.vegetarian}
							onChange={() =>
								setFilters((p) => ({ ...p, vegetarian: !p.vegetarian }))
							}
						/>
						<label htmlFor="veg">Vegetarian</label>
					</div>
					<div className="filter-row">
						<input
							type="checkbox"
							id="vegan"
							checked={filters.vegan}
							onChange={() => setFilters((p) => ({ ...p, vegan: !p.vegan }))}
						/>
						<label htmlFor="vegan">Vegan</label>
					</div>
					<div className="filter-row">
						<input
							type="checkbox"
							id="glutenfree"
							checked={filters.glutenFree}
							onChange={() =>
								setFilters((p) => ({ ...p, glutenFree: !p.glutenFree }))
							}
						/>
						<label htmlFor="glutenfree">Gluten Free</label>
					</div>

					{/* Other (custom) filter */}
					<div className="filter-row">
						<input
							type="checkbox"
							id="other"
							checked={filters.otherEnabled}
							onChange={() =>
								setFilters((p) => ({ ...p, otherEnabled: !p.otherEnabled }))
							}
						/>
						<label htmlFor="other">Other</label>
						{filters.otherEnabled && (
							<input
								type="text"
								className="other-filter-input"
								placeholder="Type a custom filter"
								value={filters.otherText}
								onChange={(e) =>
									setFilters((p) => ({ ...p, otherText: e.target.value }))
								}
							/>
						)}
					</div>
				</div>
			</aside>

			{/* User Feedback Section */}
			<section className="user-feedback">
				<h2>Recent Reviews</h2>
				{userFeedback.map((feedback) => (
					<div key={feedback.id} className="feedback-item">
						<div className="feedback-header">
							<img
								src={feedback.user.avatar}
								alt={feedback.user.name}
								className="user-avatar"
							/>
							<div className="user-info">
								<div className="user-name">{feedback.user.name}</div>
								<div className="user-level">{feedback.user.level}</div>
							</div>
						</div>
						<div className="feedback-recipe">{feedback.recipe}</div>
						<div className="star-rating">{renderStars(feedback.rating)}</div>
						<p className="feedback-comment">{feedback.comment}</p>
						<div className="feedback-date">{feedback.date}</div>
					</div>
				))}
			</section>
		</div>
	);
}
