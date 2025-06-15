import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/product_details_styles.css";
import favIcon from "../assets/favicon.png";
import ReactDOM from 'react-dom'

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarPhotos, setSimilarPhotos] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error!");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) =>
            p.id !== product.id &&
            (p.category === product.category ||
              p.location === product.location ||
              p.user?.id === product.user?.id)
        );
        setSimilarPhotos(filtered.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, [product]);

  if (loading) return <p>Loading Product details...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div className="main_container">
      <div className="product_details_container">
        <div className="selected_product-detail">
          <img
            src={product.image}
            alt={product.name}
            className="selected_product_img"
          />
          <div className="product-info">
            <span>
              {product.name} | {product.description}{" "}
            </span>
            <span>{product.quantity} Items in Stock </span>
            <span>Sold by: {product.user?.first_name}</span>
            <span>Price: ${product.price_in_cents}</span>

          <div className="favicon-contact-seller"> 
            <button type="submit" className="save_fav_product_button">
              <img src={favIcon} alt="Favourites" className="fav_icon" /> Save{" "}
            </button>
          
              <Link to="/chats/2">
                <button className="btn-primary">
                  Message Seller
                </button>
              </Link>
              </div>

          </div>
        </div>
      </div>
      {/*Similar images  */}
      <hr />
      <div className="similar-photos-section">
        <h3>Similar Products by Location, Category or the same seller</h3>
        <div className="similar-photos-grid">
          {similarPhotos.map((photo) => (
            <div>
              <Link
                key={photo.id}
                to={`/product/${photo.id}`}
                className="similar-photo-card"
              >
                <img
                  src={photo.image}
                  alt={photo.name}
                  className="similar_imgs"
                />
              </Link>
              <div className="products_info"> 
              <span>{photo.name} | {photo.description}  </span>       
              <p>{photo.quantity} item left <br />      
                ${(photo.price_in_cents / 100).toFixed(2)}</p><br />
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
