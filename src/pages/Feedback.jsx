import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { db } from "../config/firebase";
import "../App.css";

export default function Feedback() {
	const [feedback, setFeedback] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState({
		show: false,
		success: false,
		message: "",
	});
	const { user } = useAuth();

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
			await addDoc(collection(db, "feedback"), {
				message: feedback,
				userEmail: user?.email || "Anonymous",
				userId: user?.uid || "anonymous",
				timestamp: serverTimestamp(),
			});

			setFeedback(""); // Clear the input
			setSubmitStatus({
				show: true,
				success: true,
				message: "Thank you! Your feedback has been submitted successfully.",
			});
		} catch (error) {
			console.error("Error submitting feedback:", error);
			setSubmitStatus({
				show: true,
				success: false,
				message:
					"There was an error submitting your feedback. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="feedback-card">
			<h1 className="feedback-title">Feedback</h1>

			{submitStatus.show && (
				<div
					className={`feedback-status ${
						submitStatus.success ? "success" : "error"
					}`}
				>
					{submitStatus.message}
				</div>
			)}

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
