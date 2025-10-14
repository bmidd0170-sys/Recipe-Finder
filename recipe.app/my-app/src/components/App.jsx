import "./App.css";
import Feedback from "../pages/Feedback";
import { Routes, Route } from "react-router-dom";
export default function RecipeFinder() {
  return (
    <div className="app container">
      {/* Header */}
      
      <header className="header">
        <div className="brand">
          <div className="profile">RF</div>
          <div>
            <span className="title">Recipe Finder</span>
            <span className="subtitle">Discover & cook smarter</span>
          </div>
        </div>
        <div className="top-actions">
          <form className="search" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Search recipes…" />
            <button className="icon-btn" type="submit">
              🔍
            </button>
          </form>
          
      <button className="Feedback-button">Feedback</button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="main">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Upload Dish</h3>
          <div className="upload-area">
            <label htmlFor="fileUpload" className="btn-primary">
              Choose File
            </label>
            <input type="file" id="fileUpload" />
            <p>or drag &amp; drop here</p>
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

        {/* Search Results / Cards */}
        <section className="content">
          <h2>Search Results</h2>
          <button className="btn-primary">Upload Image</button>
        </section>

        {/* Recipe Detail */}
        <aside className="recipe-detail">
          <div className="title-row">
            <h2>Recipe Detail</h2>
            <button className="icon-btn">✏️</button>
          </div>

          <div className="ingredients">
            <div className="tag">Tomatoes</div>
            <div className="tag">Basil</div>
            <div className="tag">Olive Oil</div>
            <div className="tag">Garlic</div>
            <div className="tag">Salt</div>
            <div className="tag">Pepper</div>
          </div>

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              <li>Sauté garlic in olive oil.</li>
              <li>Add chopped tomatoes &amp; simmer.</li>
              <li>Blend until smooth, stir in basil.</li>
              <li>Season and serve hot.</li>
            </ol>
          </div>
        </aside>
      </main>

      {/* Feedback Section */}
      <Routes>
        <Route path="/feedback" element={<Feedback />} />
      </Routes>



      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Recipe Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}
