import React, { useState } from "react";

const WriterSuggestion = ({ name, username }) => {
  // ✅ State to track if the writer is added
  const [isAdded, setIsAdded] = useState(false);

  // ✅ Function to handle Add button click
  const handleAddClick = () => {
    setIsAdded(true); // Mark as added (disable further clicks)
  };

  return (
    <li>
      <span>{name} ({username})</span>
      {/* ✅ Updated button with dynamic class and text */}
      <button className={`add-btn ${isAdded ? "added" : ""}`} onClick={handleAddClick} disabled={isAdded}>
        {isAdded ? "Added" : "➕ Add"}
      </button>
    </li>
  );
};

export default WriterSuggestion;
