import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout({ user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [showSwappableOnly, setShowSwappableOnly] = useState(false);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setSearchSubmitted(false); // reset flash/error when user changes input
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSearchSubmitted(false); // reset flash/error when category changes
  };

  const handleSubmit = () => {
    setSearchSubmitted(true); // trigger search filter
  };

  return (
    <>
      <Header
        user={user}
        onLogout={onLogout}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onSubmitClick={handleSubmit}
        showSwappableOnly={showSwappableOnly}
        setShowSwappableOnly={setShowSwappableOnly}
      />

      {/* Pass props to nested routes (Product) */}
      <Outlet
        context={{ searchTerm, category, searchSubmitted, setSearchSubmitted, showSwappableOnly}}
      />
    </>
  );
}
