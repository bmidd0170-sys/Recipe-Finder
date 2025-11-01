import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { 
    getAllFeedback, 
    getFeedbackStats, 
    markFeedbackAsRead,
    exportFeedbackData,
    clearAllFeedback 
} from "./FeedbackHandler";

export default function FeedbackViewer() {
    const { currentUser } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    const [stats, setStats] = useState({});
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    // Check if current user is an admin
    const isAdmin = currentUser && currentUser.email && 
        (currentUser.email === 'bmidd0170@launchpadphilly.org' || 
         currentUser.email === 'braydenmiddlebrooks@gmail.com');

    useEffect(() => {
        loadFeedback();
    }, []);

    const loadFeedback = () => {
        const allFeedback = getAllFeedback();
        const feedbackStats = getFeedbackStats();
        setFeedbacks(allFeedback);
        setStats(feedbackStats);
    };

    const handleMarkAsRead = (feedbackId) => {
        markFeedbackAsRead(feedbackId);
        loadFeedback(); // Refresh the data
    };

    const handleExportData = () => {
        const data = exportFeedbackData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `recipe-finder-feedback-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear all feedback? This action cannot be undone.")) {
            clearAllFeedback();
            loadFeedback();
        }
    };

    const filteredFeedback = feedbacks.filter(feedback => {
        if (filter === "all") return true;
        if (filter === "unread") return feedback.status !== "read";
        return feedback.category === filter;
    });

    const sortedFeedback = [...filteredFeedback].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.timestamp) - new Date(a.timestamp);
            case "oldest":
                return new Date(a.timestamp) - new Date(b.timestamp);
            case "rating":
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const renderStars = (rating) => {
        if (!rating) return <span className="no-rating">No rating</span>;
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    // If user is not an admin, show unauthorized message
    if (!isAdmin) {
        return (
            <div className="feedback-viewer">
                <div className="unauthorized-access">
                    <h2>Unauthorized Access</h2>
                    <p>You don't have permission to view this page.</p>
                    <p>Only administrators can access the feedback management system.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="feedback-viewer">
            <div className="feedback-viewer-header">
                <h1>Feedback Management</h1>
                <div className="feedback-actions">
                    <button onClick={handleExportData} className="export-btn">
                        Export Data
                    </button>
                    <button onClick={handleClearAll} className="clear-btn">
                        Clear All
                    </button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="feedback-stats">
                <div className="stat-card">
                    <h3>Total Feedback</h3>
                    <p className="stat-number">{stats.total || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Recent (24h)</h3>
                    <p className="stat-number">{stats.recent || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Categories</h3>
                    <div className="category-breakdown">
                        {Object.entries(stats.categories || {}).map(([category, count]) => (
                            <span key={category} className="category-item">
                                {category}: {count}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters and Controls */}
            <div className="feedback-controls">
                <div className="filter-section">
                    <label>Filter by:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Feedback</option>
                        <option value="unread">Unread Only</option>
                        <option value="general">General</option>
                        <option value="bug">Bug Reports</option>
                        <option value="feature">Feature Requests</option>
                        <option value="recipe">Recipe Quality</option>
                        <option value="ui">User Interface</option>
                        <option value="performance">Performance</option>
                    </select>
                </div>
                <div className="sort-section">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="rating">Highest Rating</option>
                    </select>
                </div>
            </div>

            {/* Feedback List */}
            <div className="feedback-list">
                {sortedFeedback.length === 0 ? (
                    <div className="no-feedback">
                        <p>No feedback found matching your filters.</p>
                    </div>
                ) : (
                    sortedFeedback.map((feedback) => (
                        <div 
                            key={feedback.id} 
                            className={`feedback-item ${feedback.status === 'read' ? 'read' : 'unread'}`}
                        >
                            <div className="feedback-header">
                                <div className="feedback-meta">
                                    <span className="feedback-id">#{feedback.id}</span>
                                    <span className="feedback-category">{feedback.category}</span>
                                    <span className="feedback-date">{formatDate(feedback.timestamp)}</span>
                                    <span className="feedback-session">Session: {feedback.sessionId || 'Unknown'}</span>
                                </div>
                                <div className="feedback-actions">
                                    {feedback.rating && (
                                        <div className="feedback-rating-display">
                                            {renderStars(feedback.rating)}
                                        </div>
                                    )}
                                    {feedback.status !== 'read' && (
                                        <button 
                                            onClick={() => handleMarkAsRead(feedback.id)}
                                            className="mark-read-btn"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="feedback-content">
                                <p>{feedback.message}</p>
                            </div>
                            {feedback.url && (
                                <div className="feedback-context">
                                    <small>Submitted from: {feedback.url}</small>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}