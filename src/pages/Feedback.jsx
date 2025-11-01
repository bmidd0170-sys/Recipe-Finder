import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { saveFeedbackToFile } from "../components/FeedbackHandler";
import "../App.css";

export default function Feedback() {
	const [feedback, setFeedback] = useState("");
	const [category, setCategory] = useState("general");
	const [rating, setRating] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState({
		show: false,
		success: false,
		message: "",
	});
	const { currentUser } = useAuth();

	const handleChange = (e) => {
		setFeedback(e.target.value);
	};

	const handleSubmit = async () => {
		if (feedback.trim() === "") {
			setSubmitStatus({
				show: true,
				success: false,
				message: "Please enter your feedback before submitting.",
			});
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus({ show: false, success: false, message: "" });

		try {
			const feedbackData = {
				message: feedback,
				userEmail: currentUser?.email || "Anonymous",
				userId: currentUser?.uid || "anonymous",
				category: category,
				rating: rating > 0 ? rating : null
			};

			const success = await saveFeedbackToFile(feedbackData);

			if (success) {
				setFeedback(""); // Clear the input
				setCategory("general"); // Reset category
				setRating(0); // Reset rating
				setSubmitStatus({
					show: true,
					success: true,
					message: "Thank you! Your feedback has been saved successfully.",
				});

				// Clear success message after 3 seconds
				setTimeout(() => {
					setSubmitStatus({ show: false, success: false, message: "" });
				}, 3000);
			} else {
				throw new Error("Failed to save feedback");
			}
		} catch (error) {
			console.error("Error submitting feedback:", error);
			setSubmitStatus({
				show: true,
				success: false,
				message: "There was an error submitting your feedback. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="feedback-card">
			<h1 className="feedback-title">Feedback</h1>

			{submitStatus.show && (
				<div className={`feedback-status ${submitStatus.success ? 'success' : 'error'}`}>
					{submitStatus.message}
				</div>
			)}

			{/* Category Selection */}
			<div className="feedback-category">
				<label htmlFor="category">Category:</label>
				<select
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					disabled={isSubmitting}
					className="feedback-select"
				>
					<option value="general">General Feedback</option>
					<option value="bug">Bug Report</option>
					<option value="feature">Feature Request</option>
					<option value="recipe">Recipe Quality</option>
					<option value="ui">User Interface</option>
					<option value="performance">Performance</option>
				</select>
			</div>

			{/* Rating System */}
			<div className="feedback-rating">
				<label>Overall Rating (optional):</label>
				<div className="star-rating">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							className={`star ${rating >= star ? 'filled' : ''}`}
							onClick={() => setRating(star)}
							disabled={isSubmitting}
						>
							★
						</button>
					))}
					{rating > 0 && (
						<button
							type="button"
							className="clear-rating"
							onClick={() => setRating(0)}
							disabled={isSubmitting}
						>
							Clear
						</button>
					)}
				</div>
			</div>

			<textarea
				className="feedback-input"
				value={feedback}
				onChange={handleChange}
				placeholder="Share your thoughts, suggestions, or report any issues..."
				disabled={isSubmitting}
			/>

			<button
				className="feedback-submit-btn"
				onClick={handleSubmit}
				disabled={isSubmitting}
			>
				{isSubmitting ? "Submitting..." : "Submit Feedback"}
			</button>
		</div>
	);
}
