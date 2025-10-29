import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useRecentRecipes } from "../Context/RecentRecipesContext";
import { useSaves } from "../Context/RecipeSaves";
import Markdown from "react-markdown";
import ErrorBoundary from "../components/ErrorBoundary";
import ShareButton from "../components/ShareButton";

export default function ResultsPage() {
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [recipeData, setRecipeData] = useState(null);
	const { addRecent } = useRecentRecipes();
	const { addSave, removeSave, isSaved } = useSaves();

	const extractTitle = (text) => {
		if (!text) return "";
		// Get the first line as title
		const firstLine = text.split("\n")[0];
		return firstLine
			.replace(/Recipe for |Instructions for |How to make /i, "")
			.trim();
	};

	const handleSaveClick = () => {
		if (recipeData?.aiText) {
			if (isSaved(recipeData.aiText)) {
				removeSave(recipeData.aiText);
			} else {
				addSave(recipeData);
			}
		}
	};

	useEffect(() => {
		// Try to get recipe data from URL parameters first
		const sharedRecipe = searchParams.get("recipe");
		if (sharedRecipe) {
			try {
				const parsed = JSON.parse(sharedRecipe);
				setRecipeData(parsed);
				if (parsed.aiText) {
					addRecent(parsed);
				}
			} catch (error) {
				console.error("Error parsing shared recipe:", error);
			}
		} else if (location.state) {
			// If no URL parameters, use location state
			const { image, aiText, filters } = location.state;
			setRecipeData({
				image,
				aiText,
				filters,
				title: extractTitle(aiText),
			});
		}
	}, [searchParams, location.state, addRecent]);

	// If there's no recipe data, show a message
	if (!recipeData) {
		return (
			<div className="result-page">
				<h2 className="result-title">No Recipe Selected</h2>
				<div className="markdown-center">
					<ErrorBoundary>
						<Markdown>Go to the main page to generate a new recipe!</Markdown>
					</ErrorBoundary>
				</div>
			</div>
		);
	}

	return (
		<div className="result-page">
			<div className="result-header">
				<h2 className="result-title">Your Dish Result</h2>
			</div>

			<div className="image-container">
				{recipeData.image ? (
					<>
						<img src={recipeData.image} alt="Dish" className="preview-image" />
						<div className="action-buttons">
							<button
								className="action-button-f"
								onClick={handleSaveClick}
								title={
									isSaved(recipeData.aiText)
										? "Remove from saved recipes"
										: "Save recipe"
								}
							>
								<i>{isSaved(recipeData.aiText) ? "♥" : "♡"}</i>
								<span>Favorite</span>
							</button>
							<button className="action-button-s" onClick={() => {}}>
								<ShareButton recipeData={recipeData} />
								<span>Share</span>
							</button>
						</div>
					</>
				) : (
					<p>No image available</p>
				)}
			</div>

			<div className="recipe-info">
				<div className="recipe-title">
					<h3>Dish Title</h3>
					<ErrorBoundary>
						<h3 className="dish-name">
							{recipeData.aiText
								? extractTitle(recipeData.aiText)
								: "Title not available..."}
						</h3>
					</ErrorBoundary>
				</div>

				<div className="recipe-details">
					<ErrorBoundary>
						<Markdown>
							{recipeData.aiText || "AI is still thinking..."}
						</Markdown>
					</ErrorBoundary>
				</div>
			</div>

			{recipeData.filters && (
				<div className="selected-filters">
					<h4>Applied Filters:</h4>
					<ul>
						{recipeData.filters.vegetarian && <li>Vegetarian</li>}
						{recipeData.filters.vegan && <li>Vegan</li>}
						{recipeData.filters.glutenFree && <li>Gluten Free</li>}
						{recipeData.filters.otherEnabled &&
							recipeData.filters.otherText && (
								<li>Other: {recipeData.filters.otherText}</li>
							)}
						{!recipeData.filters.vegetarian &&
							!recipeData.filters.vegan &&
							!recipeData.filters.glutenFree && <li>None</li>}
					</ul>
				</div>
			)}
		</div>
	);
}
