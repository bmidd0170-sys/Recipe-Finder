import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateRecipe } from "../hook/useGenerateRecipe";
import { useRecentRecipes } from "../Context/RecentRecipesContext";
import { useSaves } from "../Context/RecipeSaves";
import { findSimilarRecipe } from "../utils/recipeUtils";
import LoadingScreen from "../components/LoadingScreen";
import TrendingCarousel from "../components/TrendingCarousel";

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

		// Navigate to loading page with necessary data
		navigate("/loading", { state: { file, filters, image } });
	};

	return (
		<div className="main">
			{/* Trending and Reviews Carousel */}
			<TrendingCarousel />

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
						<div className="image-container">
							<img src={image} alt="Preview" className="image-preview" />
							<button
								className="remove-image-btn"
								onClick={() => {
									setImage(null);
									setFile(null);
									setFoundSimilar(null);
								}}
							>
								✕
							</button>
						</div>
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
							<p>or drag and drop image here</p>
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
									// Use the same loading page navigation as handleSubmit
									navigate("/loading", { state: { file, filters, image } });
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
		</div>
	);
}
