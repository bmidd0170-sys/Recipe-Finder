import React, { useState } from "react";

export function MainPage() {
	const [dragActive, setDragActive] = useState(false);
	const [fileName, setFileName] = useState("");

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		const file = e.dataTransfer.files[0];
		if (file) {
			setFileName(file.name);
			console.log("Dropped file:", file);
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFileName(file.name);
			console.log("Selected file:", file);
		}
	};

	return (
		<div className="main">
			{/* Sidebar */}
			<aside className="sidebar">
				<h3>Upload Dish</h3>

				<div
					className={`upload-area ${dragActive ? "active" : ""}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<label htmlFor="fileUpload" className="btn-upload">
						Choose File
						<input
							type="file"
							id="fileUpload"
							style={{ display: "none" }}
							onChange={handleFileChange}
						/>
					</label>

					<p>or drag &amp; drop here</p>
					{fileName && <p className="file-name">📄 {fileName}</p>}
				</div>

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
