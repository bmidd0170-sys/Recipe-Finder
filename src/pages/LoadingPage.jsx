import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { useGenerateRecipe } from "../hook/useGenerateRecipe";

export default function LoadingPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { mutateAsync } = useGenerateRecipe();
	const { file, filters, image } = location.state;

	useEffect(() => {
		const generateRecipe = async () => {
			try {
				const aiText = await mutateAsync({ file, filters });
				// Ensure loading screen is visible for at least 1 second
				await new Promise((resolve) => setTimeout(resolve, 500));
				// Navigate to results with the generated recipe
				navigate("/results", { state: { image, aiText, filters } });
			} catch (error) {
				console.error("Generation failed", error);
				// Optionally navigate back to main page on error
				navigate("/");
			}
		};

		generateRecipe();
	}, [mutateAsync, file, filters, image, navigate]);

	return <LoadingScreen />;
}
