// Local storage key for feedback data
const FEEDBACK_STORAGE_KEY = "recipeFinder_feedback";

/**
 * Save feedback to local storage only (no external services)
 * @param {Object} feedbackData - The feedback data to save
 * @returns {Promise<boolean>} - Success status
 */
export const saveFeedbackToFile = async (feedbackData) => {
    try {
        // Get existing feedback from localStorage
        const existingFeedback = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || "[]");
        
        // Generate a unique ID for this feedback
        const uniqueId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Create new feedback entry with local user info only
        const newFeedback = {
            id: uniqueId,
            message: feedbackData.message,
            timestamp: new Date().toISOString(),
            status: "pending",
            category: feedbackData.category || "general",
            rating: feedbackData.rating || null,
            userAgent: navigator.userAgent,
            url: window.location.href,
            sessionId: getSessionId(), // Generate session-based identifier
            deviceInfo: getDeviceInfo()
        };
        
        // Add to existing feedback array
        const updatedFeedback = [newFeedback, ...existingFeedback];
        
        // Keep only last 100 feedback entries to prevent storage overflow
        const trimmedFeedback = updatedFeedback.slice(0, 100);
        
        // Save to localStorage
        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(trimmedFeedback));
        
        console.log("Feedback saved locally:", newFeedback.id);
        return true;
    } catch (error) {
        console.error("Error saving feedback:", error);
        return false;
    }
};

/**
 * Generate a session-based identifier (no personal info)
 * @returns {string} - Session identifier
 */
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('recipe_finder_session');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('recipe_finder_session', sessionId);
    }
    return sessionId;
};

/**
 * Get basic device info (no personal data)
 * @returns {Object} - Device information
 */
const getDeviceInfo = () => {
    return {
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        timestamp: new Date().toISOString()
    };
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