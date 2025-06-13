import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-dashboard" style={{ padding: '1rem' }}>
      <h1>Hello, Admin</h1>
      <p>Current Listings: {products.length}</p>
      <p>Current Categories: 5</p>

      <div>
        {products.length === 0 && <p>No products found.</p>}

        {products.map(product => (
          <div
            key={product.id}
            style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem' }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '150px', height: '100px', objectFit: 'cover' }}
            />
            <div>
              <h4>{product.name}</h4>
              <p>Price: ${(product.price_in_cents / 100).toFixed(2)}</p>
              <button
                style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
