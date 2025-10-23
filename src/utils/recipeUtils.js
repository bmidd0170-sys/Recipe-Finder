// Function to check if two sets of filters are equal
const areFiltersEqual = (filters1, filters2) => {
    if (!filters1 || !filters2) return false;
    
    return (
        filters1.vegetarian === filters2.vegetarian &&
        filters1.vegan === filters2.vegan &&
        filters1.glutenFree === filters2.glutenFree &&
        filters1.otherEnabled === filters2.otherEnabled &&
        (!filters1.otherEnabled || filters1.otherText === filters2.otherText)
    );
};

// Function to find similar recipes
export const findSimilarRecipe = (image, filters, recentRecipes, savedRecipes) => {
    // Combine recent and saved recipes, removing duplicates
    const allRecipes = [...recentRecipes];
    savedRecipes.forEach(savedRecipe => {
        if (!allRecipes.find(r => r.aiText === savedRecipe.aiText)) {
            allRecipes.push(savedRecipe);
        }
    });

    // Return the first recipe that matches the filters
    return allRecipes.find(recipe => areFiltersEqual(recipe.filters, filters));
};