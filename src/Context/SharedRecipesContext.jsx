import { createContext, useContext, useState } from "react";
import {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
} from "firebase/firestore";
import { app } from "../config/firebase";

const SharedRecipesContext = createContext();

export function useSharedRecipes() {
	return useContext(SharedRecipesContext);
}

export function SharedRecipesProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const db = getFirestore(app);

	// Generate a unique ID for a recipe
	const generateRecipeId = () => {
		const timestamp = Date.now();
		const random = Math.random().toString(36).substring(2, 15);
		return `${timestamp}-${random}`;
	};

	// Store a recipe and get its ID
	const shareRecipe = async (recipe) => {
		setLoading(true);
		setError(null);
		try {
			const id = generateRecipeId();
			const recipeData = {
				...recipe,
				createdAt: new Date().toISOString(),
				image: recipe.image || null,
			};

			const recipeRef = doc(collection(db, "sharedRecipes"), id);
			await setDoc(recipeRef, recipeData);

			return id;
		} catch (err) {
			console.error("Error sharing recipe:", err);
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	// Retrieve a recipe by ID
	const getSharedRecipe = async (id) => {
		setLoading(true);
		setError(null);
		try {
			const recipeRef = doc(db, "sharedRecipes", id);
			const recipeSnap = await getDoc(recipeRef);

			if (recipeSnap.exists()) {
				return recipeSnap.data();
			} else {
				throw new Error("Recipe not found");
			}
		} catch (err) {
			console.error("Error fetching recipe:", err);
			setError(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const value = {
		shareRecipe,
		getSharedRecipe,
		loading,
		error,
	};

	return (
		<SharedRecipesContext.Provider value={value}>
			{children}
		</SharedRecipesContext.Provider>
	);
}
