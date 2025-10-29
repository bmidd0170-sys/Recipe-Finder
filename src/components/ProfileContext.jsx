// src/ProfileContext.jsx
import React, { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

// Named export: ProfileProvider
export function ProfileProvider({ children }) {
	const defaultImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
	const [profileImage, setProfileImage] = useState(defaultImage);

	const resetProfile = () => {
		setProfileImage(defaultImage);
		localStorage.removeItem('userProfileImage');
	};

	return (
		<ProfileContext.Provider value={{ 
			profileImage, 
			setProfileImage,
			resetProfile
		}}>
			{children}
		</ProfileContext.Provider>
	);
}

// Named export: useProfile hook
export function useProfile() {
	return useContext(ProfileContext);
}
