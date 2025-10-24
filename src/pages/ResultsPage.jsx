import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecentRecipes } from "../Context/RecentRecipesContext";
import { useSaves } from "../Context/RecipeSaves";
import { useSharedRecipes } from "../Context/SharedRecipesContext";
import Markdown from "react-markdown";
import ErrorBoundary from "../components/ErrorBoundary";

export default function ResultsPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { recipeId } = useParams();
	const { shareRecipe, getSharedRecipe } = useSharedRecipes();
	const [shareUrl, setShareUrl] = useState("");
	const [showShareTooltip, setShowShareTooltip] = useState(false);

	// Get recipe data either from navigation state or shared recipes
	const recipeData = recipeId ? getSharedRecipe(recipeId) : location.state;
	const { image, aiText, filters } = recipeData || {};

	const { addRecent } = useRecentRecipes();
	const { addSave, removeSave, isSaved } = useSaves();

	const handleSaveClick = () => {
		if (aiText) {
			const recipe = { image, aiText, filters };
			if (isSaved(aiText)) {
				removeSave(aiText);
			} else {
				addSave(recipe);
			}
		}
	};

	useEffect(() => {
		if (aiText) {
			addRecent({ image, aiText, filters });
		}
	}, [aiText, image, filters, addRecent]);

	const extractTitle = (text) => {
		// Get the first line as title
		const firstLine = text.split("\n")[0];
		return firstLine
			.replace(/Recipe for |Instructions for |How to make /i, "")
			.trim();
	};

	// If there's no recipe data, show a message
	if (!location.state) {
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
				<div className="recipe-actions">
					<button
						className="save-button"
						onClick={handleSaveClick}
						title={
							isSaved(aiText) ? "Remove from saved recipes" : "Save recipe"
						}
					>
						{isSaved(aiText) ? "♥" : "♡"}
					</button>
					<button
						className="share-button"
						onClick={() => {
							const id = shareRecipe({ image, aiText, filters });
							const url = `${window.location.origin}/recipe/${id}`;
							setShareUrl(url);
							navigator.clipboard.writeText(url);
							setShowShareTooltip(true);
							setTimeout(() => setShowShareTooltip(false), 2000);
						}}
						title="Share recipe"
					>
						🔗
					</button>
					{showShareTooltip && (
						<div className="share-tooltip">Link copied to clipboard!</div>
					)}
				</div>
			</div>

			<div className="image-container">
				{image ? (
					<img src={image} alt="Dish" className="preview-image" />
				) : (
					<p>No image available</p>
				)}
			</div>

			<div className="recipe-info">
				<div className="recipe-title">
					<h3>Dish Title</h3>
					<ErrorBoundary>
						<h3 className="dish-name">
							{aiText ? extractTitle(aiText) : "Title not available..."}
						</h3>
					</ErrorBoundary>
				</div>

				<div className="recipe-details">
					<ErrorBoundary>
						<Markdown>{aiText || "AI is still thinking..."}</Markdown>
					</ErrorBoundary>
				</div>
			</div>

			{filters && (
				<div className="selected-filters">
					<h4>Applied Filters:</h4>
					<ul>
						{filters.vegetarian && <li>Vegetarian</li>}
						{filters.vegan && <li>Vegan</li>}
						{filters.glutenFree && <li>Gluten Free</li>}
						{filters.otherEnabled && filters.otherText && (
							<li>Other: {filters.otherText}</li>
						)}
						{!filters.vegetarian && !filters.vegan && !filters.glutenFree && (
							<li>None</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
}
