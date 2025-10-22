export default function SavedRecipes() {
		const recipes = [
  { id: 1, name: "Recipe 1" },
  { id: 2, name: "Recipe 2" },
  { id: 3, name: "Recipe 3" },
  { id: 4, name: "Recipe 4" },
  { id: 5, name: "Recipe 5" },
  { id: 6, name: "Recipe 6" },
  { id: 7, name: "Recipe 7" },
  { id: 8, name: "Recipe 8" },
  { id: 9, name: "Recipe 9" },
  { id: 10, name: "Recipe 10" },
  { id: 11, name: "Recipe 11" },
  { id: 12, name: "Recipe 12" },
  { id: 13, name: "Recipe 13" },
  { id: 14, name: "Recipe 14" },
  { id: 15, name: "Recipe 15" },
  { id: 16, name: "Recipe 16" },
  { id: 17, name: "Recipe 17" },
  { id: 18, name: "Recipe 18" },
  { id: 19, name: "Recipe 19" },
  { id: 20, name: "Recipe 20" },
  { id: 21, name: "Recipe 21" },
  { id: 22, name: "Recipe 22" },
  { id: 23, name: "Recipe 23" },
  { id: 24, name: "Recipe 24" },
  { id: 25, name: "Recipe 25" },
  { id: 26, name: "Recipe 26" },
  { id: 27, name: "Recipe 27" },
  { id: 28, name: "Recipe 28" },
  { id: 29, name: "Recipe 29" },
  { id: 30, name: "Recipe 30" },
  { id: 31, name: "Recipe 31" },
  { id: 32, name: "Recipe 32" },
  { id: 33, name: "Recipe 33" },
  { id: 34, name: "Recipe 34" },
  { id: 35, name: "Recipe 35" },
  { id: 36, name: "Recipe 36" },
  { id: 37, name: "Recipe 37" },
  { id: 38, name: "Recipe 38" },
  { id: 39, name: "Recipe 39" },
  { id: 40, name: "Recipe 40" },
  { id: 41, name: "Recipe 41" },
  { id: 42, name: "Recipe 42" },

	];

	return (
		<div className="saved-recipes-container">
			<h2 className="saved-title">Saved Recipes</h2>

			<div className="recipes-grid">
				{recipes.map((recipe) => (
					<div key={recipe.id} className="recipe-card">
						{recipe.name}
					</div>
				))}
			</div>
		</div>
	);
}
