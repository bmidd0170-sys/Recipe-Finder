// src/main.jsx or src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./components/ProfileContext"; // adjust path if different
import RecipeFinder from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ProfileProvider>
					<RecipeFinder />
				</ProfileProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
);
