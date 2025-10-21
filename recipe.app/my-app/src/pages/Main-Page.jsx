import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenAI } from "../hook/openai"; // ✅ import your hook

export default function MainPage() {
	const navigate = useNavigate();
	const { generateRecipe, loading, error } = useOpenAI();
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);

	const handleFileSelect = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setFile(file);
			setImage(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async () => {
		if (!file) return alert("Please upload an image first!");
		const aiText = await generateRecipe(file);
		navigate("/results", { state: { image, aiText } });
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
						<input type="checkbox" id="veg" />
						<label htmlFor="veg">Vegetarian</label>
					</div>
					<div className="filter-row">
						<input type="checkbox" id="vegan" />
						<label htmlFor="vegan">Vegan</label>
					</div>
					<div className="filter-row">
						<input type="checkbox" id="glutenfree" />
						<label htmlFor="glutenfree">Gluten Free</label>
					</div>
				</div>
			</aside>
		</div>
	);
}
