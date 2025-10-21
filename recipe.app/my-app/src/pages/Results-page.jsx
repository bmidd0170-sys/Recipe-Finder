import React from "react";
import { useLocation } from "react-router-dom";

export default function ResultsPage() {
	const location = useLocation();
	const { image, aiText } = location.state || {};

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
		</div>
	);
}
