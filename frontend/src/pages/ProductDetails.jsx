import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/product_details_styles.css'

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network is not in good condition!');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading Product details...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="product_details_container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} />

        <div className="product-info">
          <span>{product.name} | {product.description} </span>
          <span>Sold by: {product.user?.first_name}</span>
          <span>Price: ${product.price_in_cents}</span>
        </div>
      </div>

      <div className="buy_sell_chat_section">
        <span>Chat with the Seller</span>
        <form >
          <input className='chat_input' type='text' placeholder="Type your message" />
          <button type="submit">Send message</button>
        </form>

      </div>
    </div>
  );
}
