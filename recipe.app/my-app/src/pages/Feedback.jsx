import { useState } from "react";
import "../components/App.css";


export default function Feedback() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAdd = () => {
    if (inputValue.trim() === "") return; // ignore empty input
    setItems((prev) => [...prev, inputValue]);
    setInputValue(""); // clear textbox
  };
  return (
    <div className="feedback-card">
      <h1 className="feedback-title">Feedback</h1>
      <p>We value your feedback. Please share your thoughts with us.</p>
        <textarea
        className="feedback-input"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <button className="feedback-submit-btn" onClick={handleAdd}>Submit Feedback</button>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}