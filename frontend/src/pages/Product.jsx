import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import '../styles/products_styles.css'


export default function Product() {
  // Get search/filter props and control state from Layout via useOutletContext
  const { searchTerm, category, searchSubmitted, setSearchSubmitted, showSwappableOnly} = useOutletContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const endpoint = showSwappableOnly
     ? 'http://localhost:3000/products?swappable=true'
     :'http://localhost:3000/products';
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [showSwappableOnly]);

  // Filter products based on search and category
  const filtered = products.filter(product => {
    const searchMatch =
      product.user?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.user?.user_location?.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch = !category || category === '' || product.category?.name === category;

    // If searchTerm is empty, just filter by category
    return searchTerm ? searchMatch && categoryMatch : categoryMatch;
  });

  // Effect to show flash error message if search yields no results after submit
  useEffect(() => {
    if (!loading && searchSubmitted) {
      if (filtered.length === 0) {
        setFlashMessage(
          `No product found for "${searchTerm || 'your search'}"${
            category ? ` in category "${category}"` : ""
          }. Please try again.`
        );
        setShowFlash(true);
      } else {
        setFlashMessage('');
        setShowFlash(false);
      }
    }
  }, [filtered.length, searchSubmitted, searchTerm, category, loading]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      {showFlash && (
        <div style={{ backgroundColor: '#fcc', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px' }}>
          {flashMessage}
          <button
            onClick={() => {
              setFlashMessage('');
              setShowFlash(false);
              setSearchSubmitted(false);
            }}
            style={{
              marginLeft: '1rem',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1',
            }}
            aria-label="Close error message"
          >
            
          </button>
        </div>
      )}

      <div className="product-container">
        {filtered.map(product => (
          <div
            key={product.id}
            style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
            </Link>
            <span> {product.name} | {product.description} </span>
            <span>{product.quantity} item left </span>
            <p>Sold by: {product.user?.first_name}</p>
            <p>Price: ${(product.price_in_cents / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
