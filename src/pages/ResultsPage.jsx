import React from "react";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
	const location = useLocation();
	const { image, aiText, filters } = location.state || {};

	return (
		<div className="result-page">
			<h2 className="result-title">Your Dish Result</h2>

			<div className="image-container">
				{image ? (
					<img src={image} alt="Dish" className="preview-image" />
				) : (
					<p>No image available</p>
				)}
			</div>

			<textarea
				className="instructions-box"
				readOnly
				value={aiText || "AI is still thinking..."}
			/>

			{filters && (
				<div className="selected-filters">
					<h4>Applied Filters:</h4>
					<ul>
						{filters.vegetarian && <li>Vegetarian</li>}
						{filters.vegan && <li>Vegan</li>}
						{filters.glutenFree && <li>Gluten Free</li>}
						{filters.otherEnabled && filters.otherText && (
							<li>Other: {filters.otherText}</li>
						)}
						{!filters.vegetarian && !filters.vegan && !filters.glutenFree && (
							<li>None</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
}
