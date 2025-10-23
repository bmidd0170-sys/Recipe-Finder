import { useRecentRecipes } from "../Context/RecentRecipesContext";
import { useNavigate } from "react-router-dom";
import { useSaves } from "../Context/RecipeSaves";

export default function RecentReciepsProfile() {
	const { recentRecipes } = useRecentRecipes();
	const navigate = useNavigate();
	const { addSave, removeSave, isSaved } = useSaves();

	const extractTitle = (text) => {
		const firstLine = text.split("\n")[0];
		return firstLine
			.replace(/Recipe for |Instructions for |How to make /i, "")
			.trim();
	};

	const handleSaveClick = (e, recipe) => {
		e.stopPropagation(); // Prevent recipe card click when clicking save button
		if (isSaved(recipe.aiText)) {
			removeSave(recipe.aiText);
		} else {
			addSave(recipe);
		}
	};

	const handleRecipeClick = (recipe) => {
		navigate("/results", { state: recipe });
	};

	// Get only unique recipes based on the timestamp
	const uniqueRecipes = [
		...new Map(
			recentRecipes.map((recipe) => [recipe.timestamp, recipe])
		).values(),
	];

	return (
		<section className="recipes-section">
			<h2>Recent Recipes</h2>
			<div className="recipe-list">
				{uniqueRecipes.map((recipe, index) => (
					<div
						key={recipe.timestamp}
						className="recipe-card"
						onClick={() => handleRecipeClick(recipe)}
						style={{ cursor: "pointer" }}
					>
						{recipe.image && (
							<img src={recipe.image} alt="Recipe" className="recipe-image" />
						)}
						<div className="recipe-content">
							<div className="recipe-text">{extractTitle(recipe.aiText)}</div>
							<button
								className="save-button"
								onClick={(e) => handleSaveClick(e, recipe)}
								title={
									isSaved(recipe.aiText)
										? "Remove from saved recipes"
										: "Save recipe"
								}
							>
								{isSaved(recipe.aiText) ? "♥" : "♡"}
							</button>
							{recipe.filters && (
								<div className="recipe-filters">
									{recipe.filters.vegetarian && <span>Vegetarian</span>}
									{recipe.filters.vegan && <span>Vegan</span>}
									{recipe.filters.glutenFree && <span>Gluten Free</span>}
									{recipe.filters.otherEnabled && recipe.filters.otherText && (
										<span>Other: {recipe.filters.otherText}</span>
									)}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
