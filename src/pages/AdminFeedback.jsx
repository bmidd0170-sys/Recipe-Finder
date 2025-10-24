import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

const ADMIN_UIDS = ["YOUR_UID_HERE"]; // Replace with your Firebase UID

export default function AdminFeedback() {
	const [feedback, setFeedback] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user is admin
		if (!user || !ADMIN_UIDS.includes(user.uid)) {
			navigate("/");
			return;
		}

		const fetchFeedback = async () => {
			try {
				const feedbackRef = collection(db, "feedback");
				const q = query(feedbackRef, orderBy("timestamp", "desc"));
				const querySnapshot = await getDocs(q);

				const feedbackData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
					timestamp: doc.data().timestamp?.toDate() || new Date(),
				}));

				setFeedback(feedbackData);
			} catch (err) {
				console.error("Error fetching feedback:", err);
				setError("Failed to load feedback");
			} finally {
				setLoading(false);
			}
		};

		fetchFeedback();
	}, [user, navigate, db]);

	if (!user || !ADMIN_UIDS.includes(user.uid)) {
		return null; // or a loading spinner
	}

	if (loading) {
		return (
			<div className="admin-page">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="admin-page">
				<div className="error-message">{error}</div>
			</div>
		);
	}

	return (
		<div className="admin-page">
			<div className="admin-header">
				<h1>Admin Feedback Dashboard</h1>
				<p>Total Feedback: {feedback.length}</p>
			</div>
			<div className="feedback-list">
				{feedback.map((item) => (
					<div key={item.id} className="feedback-item">
						<div className="feedback-meta">
							<span className="feedback-date">
								{item.timestamp.toLocaleDateString()}{" "}
								{item.timestamp.toLocaleTimeString()}
							</span>
							{item.userEmail && (
								<span className="feedback-user">{item.userEmail}</span>
							)}
						</div>
						<div className="feedback-content">{item.message}</div>
					</div>
				))}
				{feedback.length === 0 && (
					<div className="no-feedback">No feedback submitted yet.</div>
				)}
			</div>
		</div>
	);
}
