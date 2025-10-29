import { createContext, useContext, useState, useEffect } from "react";

const RecentRecipesContext = createContext();

export function RecentRecipesProvider({ children }) {
	const [recentRecipes, setRecentRecipes] = useState(() => {
		// Load recent recipes from localStorage on startup
		const saved = localStorage.getItem("recentRecipes");
		return saved ? JSON.parse(saved) : [];
	});

	// Save to localStorage whenever recent recipes change
	useEffect(() => {
		localStorage.setItem("recentRecipes", JSON.stringify(recentRecipes));
	}, [recentRecipes]);

	const addRecent = (recipe) => {
		setRecentRecipes((prev) => {
			// Create new recipe with timestamp
			const newRecipe = {
				...recipe,
				timestamp: new Date().toISOString(),
			};

			// Check if this exact recipe already exists (comparing aiText)
			const isDuplicate = prev.some(
				(existingRecipe) => existingRecipe.aiText === recipe.aiText
			);

			if (isDuplicate) {
				return prev; // Don't add duplicate recipes
			}

			// Add new recipe to the beginning and keep only the last 3
			const updated = [newRecipe, ...prev].slice(0, 3);
			return updated;
		});
	};

	const clearAllRecent = () => {
		setRecentRecipes([]);
		localStorage.removeItem("recentRecipes");
	};

	return (
		<RecentRecipesContext.Provider
			value={{ recentRecipes, addRecent, clearAllRecent }}
		>
			{children}
		</RecentRecipesContext.Provider>
	);
}

export function useRecentRecipes() {
	return useContext(RecentRecipesContext);
}
