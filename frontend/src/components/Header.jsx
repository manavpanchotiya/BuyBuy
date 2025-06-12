import React from "react";
/* import '../../public/filter_styles.css' */
import { Routes, Route, Link } from "react-router-dom";
import '../../public/header_styles.css'
import Home from "../pages/Home";
import About from "../pages/About";
import SellerProducts from "../pages/Seller";
import NewProduct from "../pages/NewProductsForm";

export default function Header({
  searchTerm,
  onSearchChange,
  category,
  onCategory,
  onSubmitClick
}) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleCategoryChange = (e) => {
    onCategory(e.target.value);
  };

  return (
    <header className='header_layout'>
    <img className='header-img' src='/images/sampleHeader.png' alt='Buybuy' />

    <nav className="nav-links">
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/products">All Products</Link> | {""}
        <Link to="/seller">My Products</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/login">Sign Up</Link>
      </nav>
    
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

      <span className="submit-search"> 
      <button type="submit" className="search_button" onClick={onSubmitClick}>Search</button>
      </span>
    </div>
    </header>
  );
}
