const LoadingScreen = () => {
	// Combined tips array - both AI process tips and cooking tips
	const tips = [
		"Our AI is analyzing thousands of recipes to find your perfect match",
		"Each recipe is tailored to your dietary preferences and restrictions",
		"We consider seasonal ingredients and cooking techniques",
		"Always read the entire recipe before starting to cook",
		"Prep and measure all ingredients before you start cooking",
		"Keep your knife sharp for better control and safety",
	];

	// Get three random tips
	const getRandomTips = (count) => {
		const shuffled = [...tips].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, count);
	};

	const selectedTips = getRandomTips(3);

	return (
		<div
			className="loading-screen visible"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 9999,
				background: "rgba(255, 236, 210, 0.95)",
				backdropFilter: "blur(8px)",
			}}
		>
			<div
				className="loading-content"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "90%",
					maxWidth: "500px",
				}}
			>
				<div className="loading-spinner"></div>
				<h2 className="loading-title">Creating Your Perfect Recipe</h2>
				<p className="loading-message">
					Our AI chef is carefully analyzing your image and crafting a
					personalized recipe just for you...
				</p>

				<div className="loading-tips">
					<h3>Did You Know?</h3>
					<ul>
						{selectedTips.map((tip, index) => (
							<li key={index}>{tip}</li>
						))}
					</ul>
				</div>

				<div className="loading-progress">
					<div className="loading-progress-bar"></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
