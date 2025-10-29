import { useState, useEffect, useCallback } from "react";
import { topSearches, userFeedback } from "../data/mockData";

export default function TrendingCarousel() {
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
							style={{ opacity: 1, transition: "opacity 0.5s ease-in-out" }}
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
