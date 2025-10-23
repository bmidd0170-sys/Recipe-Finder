import { createContext, useContext, useState, useEffect } from "react";

const SavesContext = createContext();

export function SavesProvider({ children }) {
	const [saves, setSaves] = useState(() => {
		// Load favorites from localStorage on startup
		const saved = localStorage.getItem("saves");
		return saved ? JSON.parse(saved) : [];
	});

	// Save to localStorage whenever favorites change
	useEffect(() => {
		localStorage.setItem("saves", JSON.stringify(saves));
	}, [saves]);

	const addSave = (recipe) => {
		setSaves((prev) => {
			// Check for duplicates using the recipe text
			if (prev.find((r) => r.aiText === recipe.aiText)) return prev;
			return [...prev, { ...recipe, savedAt: new Date().toISOString() }];
		});
	};

	const removeSave = (recipeText) => {
		setSaves((prev) => prev.filter((r) => r.aiText !== recipeText));
	};

	const isSaved = (recipeText) => saves.some((r) => r.aiText === recipeText);

	return (
		<SavesContext.Provider value={{ saves, addSave, removeSave, isSaved }}>
			{children}
		</SavesContext.Provider>
	);
}

export function useSaves() {
	return useContext(SavesContext);
}
