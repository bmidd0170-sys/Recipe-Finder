import { useSaves } from "../Context/RecipeSaves";
import { useNavigate } from "react-router-dom";

export default function SavedReciepsProfile() {
	const { saves, removeSave } = useSaves();
	const navigate = useNavigate();

	const handleRecipeClick = (recipe) => {
		navigate("/results", { state: recipe });
	};

	const handleUnsaveClick = (e, recipe) => {
		e.stopPropagation();
		removeSave(recipe.aiText);
	};

	const extractTitle = (text) => {
		const firstLine = text.split("\n")[0];
		return firstLine
			.replace(/Recipe for |Instructions for |How to make /i, "")
			.trim();
	};

	// Only show the 3 most recent saved recipes
	const recentSaves = saves.slice(0, 3);

	if (recentSaves.length === 0) {
		return (
			<section className="recipes-section">
				<h2>Saved Recipes</h2>
				<p className="no-recipes">No saved recipes yet</p>
			</section>
		);
	}

	return (
		<section className="recipes-section">
			<h2>Saved Recipes</h2>
			<div className="recipe-list">
				{recentSaves.map((recipe) => (
					<div
						key={recipe.savedAt}
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
								onClick={(e) => handleUnsaveClick(e, recipe)}
								title="Remove from saved recipes"
							>
								♥
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
