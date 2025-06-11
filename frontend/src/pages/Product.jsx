import React, { useEffect, useState } from 'react';
import '../../public/products_styles.css'

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched Product Items:', data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className='product-container'>
      
      {products.map((product) => (
        <div key={product.id} 
        style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>

          <img src={product.image} alt={product.name} style={{ width: '150px', height:'100px'}} />

          <div className='product-info'>
         <span>{product.name}</span> 
          <span>Price: ${product.price_in_cents}</span>
          <span>Sold by: {product.user?.first_name || 'Unknown'}</span>
          {/* Hidden category (stored for filtering later) */}
          <p style={{ display: 'none' }}>{product.category?.name}</p>
            </div>                   
        </div>
      ))}
    </div>
  );
}

export default Product;
