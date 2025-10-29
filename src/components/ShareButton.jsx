import React, { useState } from "react";

const ShareButton = ({ recipeData }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleShare = async (e) => {
		e.stopPropagation(); // Prevent parent button click
		if (isLoading) return; // Prevent multiple clicks while loading

		setIsLoading(true);
		try {
			if (!recipeData) {
				console.error("No recipe data to share");
				return;
			}

			// Create a clean version of the recipe data for sharing
			const shareableData = {
				aiText: recipeData.aiText,
				filters: recipeData.filters,
				title: recipeData.title,
			};

			const shareableDataString = encodeURIComponent(
				JSON.stringify(shareableData)
			);
			const shareUrl = `${window.location.origin}/results?recipe=${shareableDataString}`;

			// Add a small delay to make the loading state visible
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Try to use the Web Share API if available
			if (navigator.share) {
				await navigator.share({
					title: "Recipe Finder - Check out this recipe!",
					text: `Check out this recipe: ${
						recipeData.aiText ? recipeData.aiText.split("\n")[0] : "Recipe"
					}`,
					url: shareUrl,
				});
			} else {
				// Fallback to copying to clipboard
				await navigator.clipboard.writeText(shareUrl);
				setShowTooltip(true);
				setTimeout(() => setShowTooltip(false), 2000);
			}
		} catch (error) {
			console.error("Error sharing recipe:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="share-button-container" onClick={handleShare}>
			{isLoading ? (
				<div className="share-loading">
					<div className="share-spinner"></div>
				</div>
			) : (
				<i>↗</i>
			)}
			{showTooltip && (
				<div className="share-tooltip">Link copied to clipboard!</div>
			)}
		</div>
	);
};

export default ShareButton;
