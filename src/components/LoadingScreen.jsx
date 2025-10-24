const LoadingScreen = () => {
	// Array of cooking tips to display randomly
	const cookingTips = [
		"Always read the entire recipe before starting to cook",
		"Prep and measure all ingredients before you start cooking",
		"Keep your knife sharp for better control and safety",
		"Season throughout the cooking process, not just at the end",
		"Let meat rest after cooking to retain its juices",
		"Room temperature ingredients mix better than cold ones",
		"Clean as you go to maintain an organized workspace",
	];

	// Get a random tip
	const randomTip = cookingTips[Math.floor(Math.random() * cookingTips.length)];

	return (
		<div className="loading-overlay">
			<div className="loading-content">
				<div className="loading-spinner"></div>
				<div className="loading-text">Analyzing Your Image</div>
				<div className="loading-subtext">
					Our AI is carefully reviewing your image to identify ingredients and
					recipes
				</div>

				<div className="loading-tips">
					<h3>Cooking Tip</h3>
					<ul>
						<li>{randomTip}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
