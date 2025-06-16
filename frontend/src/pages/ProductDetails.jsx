import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/product_details_styles.css';
import favIcon from '../assets/favicon.png';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarPhotos, setSimilarPhotos] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network error!');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    // Fetch similar photos
    fetch(`http://localhost:3000/products`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p =>
          p.id !== product.id && (
            p.category === product.category ||
            p.location === product.location ||
            p.user?.id === product.user?.id
          )
        );
        setSimilarPhotos(filtered.slice(0, 4));
      })
      .catch(err => console.error(err));

    // Check if product is already saved as favourite
    if (userToken) {
      fetch('http://localhost:3000/favourites', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(favourites => {
          const saved = favourites.some(p => p.id === product.id);
          setIsSaved(saved);
        })
        .catch(err => console.error('Error fetching favourites:', err));
    }
  }, [product, userToken]);

  const handleSave = () => {
    if (!userToken) {
      alert('Please log in to save favourites.');
      return;
    }

    if (isSaved) {
      // Remove from favourites
      fetch(`http://localhost:3000/favourites/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to remove favourite');
          setIsSaved(false);
        })
        .catch(err => {
          console.error(err);
          alert('Could not remove from favourites.');
        });
    } else {
      // Add to favourites
      fetch('http://localhost:3000/favourites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: product.id }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to save favourite');
          setIsSaved(true);
        })
        .catch(err => {
          console.error(err);
          alert('Could not save to favourites.');
        });
    }
  };

  if (loading) return <p>Loading Product details...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div>
      <div className="product_details_container">
        <div className="selected_product-detail">
          <img src={product.image} alt={product.name} className='selected_product_img' />
          <div className="product-info">
            <span>{product.name} | {product.description}</span>
            <span>{product.quantity} Items in Stock</span>
            <span>Sold by: {product.user?.first_name}</span>
            <span>Price: ${(product.price_in_cents / 100).toFixed(2)}</span>

            <button onClick={handleSave} className='save_fav_product_button'>
              <img src={favIcon} alt='Favourites' className='fav_icon' />
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        <div className="buy_sell_chat_section">
          <span>Chat with the Seller</span>
          <form>
            <input className='chat_input' type='text' placeholder="Type your message" />
            <button type="submit">Send message</button>
          </form>
        </div>
      </div>

      {/* Similar Products */}
      <hr />
      <div className="similar-photos-section">
        <h3>Similar Products by Location, Category or the Same Seller</h3>
        <div className="similar-photos-grid">
          {similarPhotos.map(photo => (
            <div key={photo.id}>
              <Link to={`/product/${photo.id}`} className="similar-photo-card">
                <img src={photo.image} alt={photo.name} className='similar_imgs' />
              </Link>
              <span>{photo.name} | {photo.description}</span>
              <p>${(photo.price_in_cents / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
