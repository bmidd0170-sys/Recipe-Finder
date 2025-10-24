import { createContext, useContext, useState } from "react";

const SharedRecipesContext = createContext();

export function useSharedRecipes() {
	return useContext(SharedRecipesContext);
}

export function SharedRecipesProvider({ children }) {
	const [sharedRecipes, setSharedRecipes] = useState({});

	// Generate a unique ID for a recipe
	const generateRecipeId = () => {
		return `r${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	};

	// Store a recipe and get its ID
	const shareRecipe = (recipe) => {
		const id = generateRecipeId();
		setSharedRecipes((prev) => ({
			...prev,
			[id]: recipe,
		}));
		return id;
	};

	// Retrieve a recipe by ID
	const getSharedRecipe = (id) => {
		return sharedRecipes[id];
	};

	const value = {
		shareRecipe,
		getSharedRecipe,
	};

	return (
		<SharedRecipesContext.Provider value={value}>
			{children}
		</SharedRecipesContext.Provider>
	);
}
