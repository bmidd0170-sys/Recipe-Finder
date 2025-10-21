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

	const addSave = (course) => {
		setSaves((prev) => {
			if (prev.find((c) => c.id === course.id)) return prev; // avoid duplicates
			return [...prev, course];
		});
	};

	const removeSave = (id) => {
		setSaves((prev) => prev.filter((c) => c.id !== id));
	};

	const isSave = (id) => saves.some((c) => c.id === id);

	return (
		<SavesContext.Provider value={{ saves, addSave, removeSave, isSave }}>
			{children}
		</SavesContext.Provider>
	);
}

export function useSaves() {
	return useContext(SavesContext);
}
