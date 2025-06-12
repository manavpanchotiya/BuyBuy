import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/seller')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error fetching seller products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading seller products...</p>;
  if (error) return <p>Error loading seller products: {error}</p>;
  if (products.length === 0) return <p>No products found for this seller.</p>;

  return (
    <div className="seller-product-container">
      <h2>My Listings</h2>
      <Link to="/seller/new">
        <button>Add New Item</button>
      </Link>

      {products.map((product) => (
        <div
          key={product.id}
          style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '150px', height: '100px' }}
          />
          <div className="product-info">
            <h4>{product.name}</h4>
            <p>Price: ${product.price_in_cents}</p>
            <p style={{ display: 'none' }}>{product.category?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SellerProducts;
