import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

// Local storage key for feedback data
const FEEDBACK_STORAGE_KEY = "recipeFinder_feedback";

/**
 * Save feedback to local file (localStorage) and optionally to Firebase
 * @param {Object} feedbackData - The feedback data to save
 * @returns {Promise<boolean>} - Success status
 */
export const saveFeedbackToFile = async (feedbackData) => {
    try {
        // Get existing feedback from localStorage
        const existingFeedback = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || "[]");
        
        // Create new feedback entry
        const newFeedback = {
            id: Date.now().toString(),
            message: feedbackData.message,
            userEmail: feedbackData.userEmail || "Anonymous",
            userId: feedbackData.userId || "anonymous",
            timestamp: new Date().toISOString(),
            status: "pending",
            category: feedbackData.category || "general",
            rating: feedbackData.rating || null,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Add to existing feedback array
        const updatedFeedback = [newFeedback, ...existingFeedback];
        
        // Keep only last 100 feedback entries to prevent storage overflow
        const trimmedFeedback = updatedFeedback.slice(0, 100);
        
        // Save to localStorage
        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(trimmedFeedback));
        
        // Also try to save to Firebase (optional - won't fail if Firebase is down)
        try {
            await addDoc(collection(db, "feedback"), {
                message: feedbackData.message,
                userEmail: feedbackData.userEmail || "Anonymous",
                userId: feedbackData.userId || "anonymous",
                timestamp: serverTimestamp(),
                category: feedbackData.category || "general",
                rating: feedbackData.rating || null,
                userAgent: navigator.userAgent,
                url: window.location.href
            });
        } catch (firebaseError) {
            console.warn("Firebase save failed, but local save succeeded:", firebaseError);
        }
        
        return true;
    } catch (error) {
        console.error("Error saving feedback:", error);
        return false;
    }
};

/**
 * Get all feedback from local storage
 * @returns {Array} - Array of feedback entries
 */
export const getAllFeedback = () => {
    try {
        const feedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
        return feedback ? JSON.parse(feedback) : [];
    } catch (error) {
        console.error("Error retrieving feedback:", error);
        return [];
    }
};

/**
 * Get feedback by category
 * @param {string} category - The category to filter by
 * @returns {Array} - Filtered feedback entries
 */
export const getFeedbackByCategory = (category) => {
    const allFeedback = getAllFeedback();
    return allFeedback.filter(feedback => feedback.category === category);
};

/**
 * Get feedback statistics
 * @returns {Object} - Statistics about feedback
 */
export const getFeedbackStats = () => {
    const allFeedback = getAllFeedback();
    
    const stats = {
        total: allFeedback.length,
        categories: {},
        ratings: {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0
        },
        recent: allFeedback.filter(f => {
            const feedbackDate = new Date(f.timestamp);
            const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            return feedbackDate > dayAgo;
        }).length
    };
    
    allFeedback.forEach(feedback => {
        // Count categories
        const category = feedback.category || "general";
        stats.categories[category] = (stats.categories[category] || 0) + 1;
        
        // Count ratings
        if (feedback.rating && feedback.rating >= 1 && feedback.rating <= 5) {
            stats.ratings[feedback.rating]++;
        }
    });
    
    return stats;
};

/**
 * Export feedback data as JSON for backup/analysis
 * @returns {string} - JSON string of all feedback
 */
export const exportFeedbackData = () => {
    const allFeedback = getAllFeedback();
    return JSON.stringify(allFeedback, null, 2);
};

/**
 * Clear all feedback data (use with caution)
 * @returns {boolean} - Success status
 */
export const clearAllFeedback = () => {
    try {
        localStorage.removeItem(FEEDBACK_STORAGE_KEY);
        return true;
    } catch (error) {
        console.error("Error clearing feedback:", error);
        return false;
    }
};

/**
 * Mark feedback as read/processed
 * @param {string} feedbackId - The ID of the feedback to mark
 * @returns {boolean} - Success status
 */
export const markFeedbackAsRead = (feedbackId) => {
    try {
        const allFeedback = getAllFeedback();
        const updatedFeedback = allFeedback.map(feedback => 
            feedback.id === feedbackId 
                ? { ...feedback, status: "read", readAt: new Date().toISOString() }
                : feedback
        );
        
        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updatedFeedback));
        return true;
    } catch (error) {
        console.error("Error marking feedback as read:", error);
        return false;
    }
};