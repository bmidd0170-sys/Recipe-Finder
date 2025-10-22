import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateRecipe } from "../hook/useGenerateRecipe";

export default function MainPage() {
	const navigate = useNavigate();
	const { mutateAsync, isLoading: loading, error } = useGenerateRecipe();
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	// Track filter checkboxes so we can send them to the OpenAI call
	const [filters, setFilters] = useState({
		vegetarian: false,
		vegan: false,
		glutenFree: false,
		otherEnabled: false,
		otherText: "",
	});

	const handleFileSelect = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setFile(file);
			setImage(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async () => {
		if (!file) return alert("Please upload an image first!");
		try {
			const aiText = await mutateAsync({ file, filters });
			navigate("/results", { state: { image, aiText, filters } });
		} catch (e) {
			// error is available from the hook
			console.error("Generation failed", e);
		}
	};

	return (
		<div className="main">
			<aside className="sidebar">
				<h3>Upload Dish</h3>
				<div className="upload-area">
					<label htmlFor="fileUpload" className="btn-upload">
						Choose File
						<input
							type="file"
							id="fileUpload"
							style={{ display: "none" }}
							accept="image/*"
							onChange={handleFileSelect}
						/>
					</label>
					{image && <img src={image} alt="Preview" className="image-preview" />}
				</div>

				<button
					className="submit-btn"
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? "Generating..." : "Generate Recipe"}
				</button>

				{error && <p className="error-text">Error: {error.message}</p>}

				<h3 style={{ marginTop: "16px" }}>Filters</h3>
				<div className="filters">
					<div className="filter-row">
						<input
							type="checkbox"
							id="veg"
							checked={filters.vegetarian}
							onChange={() =>
								setFilters((p) => ({ ...p, vegetarian: !p.vegetarian }))
							}
						/>
						<label htmlFor="veg">Vegetarian</label>
					</div>
					<div className="filter-row">
						<input
							type="checkbox"
							id="vegan"
							checked={filters.vegan}
							onChange={() => setFilters((p) => ({ ...p, vegan: !p.vegan }))}
						/>
						<label htmlFor="vegan">Vegan</label>
					</div>
					<div className="filter-row">
						<input
							type="checkbox"
							id="glutenfree"
							checked={filters.glutenFree}
							onChange={() =>
								setFilters((p) => ({ ...p, glutenFree: !p.glutenFree }))
							}
						/>
						<label htmlFor="glutenfree">Gluten Free</label>
					</div>

					{/* Other (custom) filter */}
					<div className="filter-row">
						<input
							type="checkbox"
							id="other"
							checked={filters.otherEnabled}
							onChange={() =>
								setFilters((p) => ({ ...p, otherEnabled: !p.otherEnabled }))
							}
						/>
						<label htmlFor="other">Other</label>
						{filters.otherEnabled && (
							<input
								type="text"
								className="other-filter-input"
								placeholder="Type a custom filter"
								value={filters.otherText}
								onChange={(e) =>
									setFilters((p) => ({ ...p, otherText: e.target.value }))
								}
							/>
						)}
					</div>
				</div>
			</aside>
		</div>
	);
}
