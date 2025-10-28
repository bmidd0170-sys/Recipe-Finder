import React, { useState } from "react";

const ShareButton = ({ recipeData }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleShare = async () => {
		try {
			// Create a URL-friendly version of the recipe data
			const shareableData = encodeURIComponent(JSON.stringify(recipeData));
			const shareUrl = `${window.location.origin}/results?recipe=${shareableData}`;

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
		}
	};

	return (
		<div className="share-button-container">
			<button
				onClick={handleShare}
				aria-label="Share recipe"
				style={{
					background: "none",
					border: "none",
					cursor: "pointer",
					fontSize: "24px",
				}}
			>
				<i>↗</i>
			</button>
			{showTooltip && (
				<div className="share-tooltip">Link copied to clipboard!</div>
			)}
		</div>
	);
};

export default ShareButton;
