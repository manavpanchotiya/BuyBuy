import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

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
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onSubmitClick={handleSubmit}
      />

      {/* Pass props to nested routes (Product) */}
      <Outlet
        context={{ searchTerm, category, searchSubmitted, setSearchSubmitted }}
      />
    </>
  );
}
