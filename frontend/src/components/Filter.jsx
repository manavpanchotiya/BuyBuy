import React from "react";
import '../../public/filter_styles.css'

export default function Filter({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
}) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
  };

  return (
    
      <div className="search-filter-bar">
        <input 
          type="text"
          className="search-input"
          value={searchTerm}
          placeholder="Search by location"
          onChange={handleSearchChange}
        />
      

      <div className="filter-slot">
        <label>Category</label>
        <select
          className="filter-dropdown"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="Automobiles">Automobiles</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Toys">Toys</option>
        </select>
      </div>

      <button type="submit" className="search_button">Search</button>
    </div>
  );
}
