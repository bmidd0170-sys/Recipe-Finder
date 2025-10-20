// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./components/ProfileContext"; // adjust path if different
import RecipeFinder from "./app"; 

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ProfileProvider>
				<RecipeFinder />
			</ProfileProvider>
		</BrowserRouter>
	</React.StrictMode>
);
