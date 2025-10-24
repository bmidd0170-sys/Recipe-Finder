import React, { useState } from 'react';

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
                    title: 'Recipe Finder - Check out this recipe!',
                    text: `Check out this recipe: ${recipeData.aiText ? recipeData.aiText.split('\n')[0] : 'Recipe'}`,
                    url: shareUrl,
                });
            } else {
                // Fallback to copying to clipboard
                await navigator.clipboard.writeText(shareUrl);
                setShowTooltip(true);
                setTimeout(() => setShowTooltip(false), 2000);
            }
        } catch (error) {
            console.error('Error sharing recipe:', error);
        }
    };

    return (
        <div className="share-button-container">
            <button
                className="share-button"
                onClick={handleShare}
                aria-label="Share recipe"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
            </button>
            {showTooltip && (
                <div className="share-tooltip">
                    Link copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default ShareButton;