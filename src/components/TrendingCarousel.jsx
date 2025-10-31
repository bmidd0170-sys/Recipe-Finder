import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { topSearches, userFeedback } from "../data/mockData";

// Helper function to get ingredients based on recipe name
const getIngredientsForRecipe = (recipeName) => {
	const ingredients = {
		"Spaghetti Carbonara":
			"- 400g spaghetti\n- 200g pancetta or guanciale\n- 4 large eggs\n- 100g Pecorino Romano\n- 100g Parmigiano Reggiano\n- Black pepper\n- Salt",
		"Chicken Tikka Masala":
			"- 800g chicken breast\n- 400ml heavy cream\n- 2 cups yogurt\n- Garam masala\n- Tomato sauce\n- Onions, garlic, ginger\n- Various Indian spices",
		"Beef Burgundy":
			"- 1kg beef chuck\n- Red wine\n- Pearl onions\n- Mushrooms\n- Carrots\n- Bacon\n- Beef stock",
		"Thai Green Curry":
			"- Green curry paste\n- Coconut milk\n- Chicken or tofu\n- Thai basil\n- Bamboo shoots\n- Fish sauce\n- Palm sugar",
		"Vegetable Lasagna":
			"- Lasagna noodles\n- Various vegetables\n- Ricotta cheese\n- Mozzarella\n- Tomato sauce\n- Bechamel sauce",
		"Grilled Salmon":
			"- Fresh salmon fillets\n- Lemon\n- Olive oil\n- Garlic\n- Herbs\n- Salt and pepper",
		"Mushroom Risotto":
			"- Arborio rice\n- Mixed mushrooms\n- Vegetable stock\n- White wine\n- Parmesan\n- Butter and onions",
		"Korean BBQ":
			"- Thinly sliced meat\n- Soy sauce\n- Sesame oil\n- Garlic\n- Ginger\n- Korean pear\n- Green onions",
		"Chocolate Lava Cake":
			"- Dark chocolate\n- Butter\n- Eggs\n- Sugar\n- Flour\n- Vanilla extract",
		"Greek Salad":
			"- Cucumber\n- Tomatoes\n- Red onion\n- Feta cheese\n- Kalamata olives\n- Olive oil\n- Oregano",
	};
	return ingredients[recipeName] || "Ingredients not available for this recipe";
};

// Helper function to get instructions based on recipe name
const getInstructionsForRecipe = (recipeName) => {
	const instructions = {
		"Spaghetti Carbonara":
			"1. Cook spaghetti in salted water\n2. Fry pancetta until crispy\n3. Mix eggs with grated cheese\n4. Combine hot pasta with egg mixture\n5. Add pancetta and pepper",
		"Chicken Tikka Masala":
			"1. Marinate chicken in yogurt and spices\n2. Grill or bake chicken\n3. Prepare curry sauce\n4. Combine chicken with sauce\n5. Simmer until thick",
		"Beef Burgundy":
			"1. Brown beef in batches\n2. Sauté vegetables\n3. Add wine and stock\n4. Simmer for 3 hours\n5. Add mushrooms at the end",
		"Thai Green Curry":
			"1. Fry curry paste in coconut cream\n2. Add remaining coconut milk\n3. Add protein and vegetables\n4. Simmer until cooked\n5. Season with fish sauce and sugar",
		"Vegetable Lasagna":
			"1. Prepare vegetables\n2. Make bechamel sauce\n3. Layer noodles and fillings\n4. Top with cheese\n5. Bake until golden",
		"Grilled Salmon":
			"1. Marinate salmon\n2. Preheat grill\n3. Grill skin-side up first\n4. Flip once\n5. Rest before serving",
		"Mushroom Risotto":
			"1. Sauté mushrooms\n2. Cook rice gradually with stock\n3. Stir frequently\n4. Add mushrooms back\n5. Finish with parmesan",
		"Korean BBQ":
			"1. Marinate meat\n2. Prepare accompaniments\n3. Heat grill or pan\n4. Cook meat in batches\n5. Serve with sides",
		"Chocolate Lava Cake":
			"1. Melt chocolate and butter\n2. Mix in other ingredients\n3. Pour into ramekins\n4. Bake until edges are set\n5. Serve immediately",
		"Greek Salad":
			"1. Chop vegetables\n2. Combine in a bowl\n3. Add feta and olives\n4. Drizzle with olive oil\n5. Season and toss",
	};
	return (
		instructions[recipeName] || "Instructions not available for this recipe"
	);
};

export default function TrendingCarousel() {
	const navigate = useNavigate();
	// Index for trending recipes
	const [trendingIndex, setTrendingIndex] = useState(0);
	// Index for reviews
	const [reviewIndex, setReviewIndex] = useState(0);

	const nextTrending = useCallback(() => {
		setTrendingIndex((current) => (current + 1) % topSearches.length);
	}, []);

	const prevTrending = useCallback(() => {
		setTrendingIndex((current) =>
			current === 0 ? topSearches.length - 1 : current - 1
		);
	}, []);

	const nextReview = useCallback(() => {
		setReviewIndex((current) => (current + 1) % userFeedback.length);
	}, []);

	const prevReview = useCallback(() => {
		setReviewIndex((current) =>
			current === 0 ? userFeedback.length - 1 : current - 1
		);
	}, []);

	// Auto-cycle effect
	useEffect(() => {
		const interval = setInterval(() => {
			nextTrending();
			nextReview();
		}, 3000); // Change every 3 seconds

		return () => clearInterval(interval);
	}, [nextTrending, nextReview]);

	const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

	return (
		<>
			{/* Left side - Trending Recipe */}
			<div className="carousel-left">
				<section className="top-searches">
					<h2>Trending Recipe</h2>
					<div className="carousel-container">
						<button className="carousel-arrow left" onClick={prevTrending}>
							←
						</button>
						<div
							className="search-item"
							style={{
								opacity: 1,
								transition: "opacity 0.5s ease-in-out",
								cursor: "pointer",
							}}
							onClick={async () => {
								const recipe = topSearches[trendingIndex];

								// Create a File object from the image URL
								const response = await fetch(recipe.imageUrl);
								const blob = await response.blob();
								const file = new File([blob], `${recipe.name}.jpg`, {
									type: "image/jpeg",
								});

								// Navigate to loading page with the file and image URL
								navigate("/loading", {
									state: {
										file,
										image: recipe.imageUrl,
										filters: {
											vegetarian: false,
											vegan: false,
											glutenFree: false,
											otherEnabled: false,
											otherText: "",
										},
										recipeName: recipe.name, // Pass the recipe name for context
									},
								});
							}}
						>
							<img
								src={topSearches[trendingIndex].imageUrl}
								alt={topSearches[trendingIndex].name}
							/>
							<div className="search-item-info">
								<div className="search-item-name">
									{topSearches[trendingIndex].name}
								</div>
								<div className="search-count">
									{topSearches[trendingIndex].searchCount} searches
								</div>
							</div>
						</div>
						<button className="carousel-arrow right" onClick={nextTrending}>
							→
						</button>
					</div>
				</section>
			</div>

			{/* Right side - Reviews */}
			<div className="carousel-right">
				<section className="user-feedback">
					<h2>Recent Review</h2>
					<div className="carousel-container">
						<button className="carousel-arrow left" onClick={prevReview}>
							←
						</button>
						<div
							className="feedback-item"
							style={{ opacity: 1, transition: "opacity 0.5s ease-in-out" }}
						>
							<div className="feedback-header">
								<img
									src={userFeedback[reviewIndex].user.avatar}
									alt={userFeedback[reviewIndex].user.name}
									className="user-avatar"
								/>
								<div className="user-info">
									<div className="user-name">
										{userFeedback[reviewIndex].user.name}
									</div>
									<div className="user-level">
										{userFeedback[reviewIndex].user.level}
									</div>
								</div>
							</div>
							<div className="feedback-recipe">
								{userFeedback[reviewIndex].recipe}
							</div>
							<div className="star-rating">
								{renderStars(userFeedback[reviewIndex].rating)}
							</div>
							<p className="feedback-comment">
								{userFeedback[reviewIndex].comment}
							</p>
							<div className="feedback-date">
								{userFeedback[reviewIndex].date}
							</div>
						</div>
						<button className="carousel-arrow right" onClick={nextReview}>
							→
						</button>
					</div>
				</section>
			</div>
		</>
	);
}
