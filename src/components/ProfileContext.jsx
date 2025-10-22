// src/ProfileContext.jsx
import React, { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

// Named export: ProfileProvider
export function ProfileProvider({ children }) {
	const [profileImage, setProfileImage] = useState(
		"https://cdn-icons-png.flaticon.com/512/847/847969.png"
	);

	return (
		<ProfileContext.Provider value={{ profileImage, setProfileImage }}>
			{children}
		</ProfileContext.Provider>
	);
}

// Named export: useProfile hook
export function useProfile() {
	return useContext(ProfileContext);
}
