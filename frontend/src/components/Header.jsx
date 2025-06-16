import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header_styles.css';
import favIcon from '../assets/favicon.png'; 

export default function Header({ user, onLogout, searchTerm, onSearchChange, category, onCategoryChange, onSubmitClick, showSwappableOnly }) {
  return (
    <header className='header_layout'>
      <img className="header-img" src=".././assets/sampleHeader.png" alt="Buybuy" />
      
      <nav className="nav-links">
        <Link to="/">Home</Link> |{" "}
        <Link to="/products">All Products</Link> |{" "}
        <Link to="/seller">My Products</Link> |{" "}
        {user ? (
          <>
            <span>Welcome, {user.first_name}</span> |{" "}
            <button onClick={onLogout} style={{ cursor: 'pointer' }}>
              Logout
            </button> |{" "}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/signup">Sign Up</Link> |{" "}
          </>
        )}
        <Link to="/admin">Admin</Link> |{" "}
        <Link to="/favourites">
          <img src={favIcon} alt="Favourites" className="fav_icon_nav" />
        </Link>
      </nav>

      <input
      className='search-input'
        type="text"
        value={searchTerm}
        placeholder="Search by seller or location"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className='filter-dropdown'
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      >
        <option value="">All Categories</option>
        <option value="Automobiles">Automobiles</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Home & Garden">Home & Garden</option>
        <option value="Toys">Toys</option>
      </select>

      <button
        className='search_button '
        onClick={onSubmitClick}
        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        type="button"
      >
        Search
      </button>

      <label style={{ marginLeft: '1rem' }}>
  <input
  
    type="checkbox"
    checked={showSwappableOnly}
    onChange={(e) => setShowSwappableOnly(e.target.checked)}
  />
  Swappable only
</label>

    </header>
  );
}
