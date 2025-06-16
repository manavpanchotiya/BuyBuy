import React, { useEffect, useState } from 'react';

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/favourites', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        setFavourites(data);
      })
      .catch(err => console.error('Error fetching favourites:', err));
  }, [token]);

  if (favourites.length === 0) return <p>You have no favourites yet.</p>;

  return (
    <div>
      <h2>Your Favourites</h2>
      <ul>
        {favourites.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width={100} />
            <p>{product.name} - ${(product.price_in_cents / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
