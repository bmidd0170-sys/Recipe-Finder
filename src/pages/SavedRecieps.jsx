import { useSaves } from "../Context/RecipeSaves";
import { useNavigate } from "react-router-dom";

export default function SavedRecipes() {
	const { saves } = useSaves();
	const navigate = useNavigate();

	const extractTitle = (text) => {
		const firstLine = text.split("\n")[0];
		return firstLine
			.replace(/Recipe for |Instructions for |How to make /i, "")
			.trim();
	};

	const handleRecipeClick = (recipe) => {
		navigate("/results", { state: recipe });
	};

	if (saves.length === 0) {
		return (
			<div className="saved-recipes-container">
				<h2 className="saved-title">Saved Recipes</h2>
				<p className="no-recipes">
					No saved recipes yet. Save some recipes to see them here!
				</p>
			</div>
		);
	}

	return (
		<div className="saved-recipes-container">
			<h2 className="saved-title">Saved Recipes</h2>

			<div className="recipes-grid">
				{saves.map((recipe) => (
					<div
						key={recipe.savedAt}
						className="recipe-card"
						onClick={() => handleRecipeClick(recipe)}
					>
						{recipe.image && (
							<img src={recipe.image} alt="Recipe" className="recipe-image" />
						)}
						<div className="recipe-content">
							<div className="recipe-text">{extractTitle(recipe.aiText)}</div>
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
		</div>
	);
}
