import React, { useEffect, useState } from 'react';
import '../../public/products_styles.css';
import Filter from '../components/Filter';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlash, setShowFlash] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
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
  }, []);

  const matchesSearchTerm = (product) => {
    const firstName = product.user?.first_name?.toLowerCase() || "";
    const userLocation = product.user?.user_location?.toLowerCase() || "";
    return (
      firstName.includes(searchTerm.toLowerCase()) ||
      userLocation.includes(searchTerm.toLowerCase())
    );
  };

  const matchesCategory = (product, category) => {
    if (!category || category === "All Categories") return true;
    return product.category?.name === category;
  };

  const filterProductItems = products.filter(
    (product) =>
      matchesSearchTerm(product) && matchesCategory(product, category)
  );

  const handleSubmit = () => {
    setSearchSubmitted(true); //  Trigger this when Search button is clicked
  };

  useEffect(() => {
    if (!loading && searchSubmitted) {
      if (filterProductItems.length === 0) {
        setFlashMessage(
          `No product found for "${searchTerm || 'your search'}"${
            category ? ` in category "${category}"` : ""
          }. Search again`
        );
        setShowFlash(true);
      } else {
        setFlashMessage("");
        setShowFlash(false);
      }
    }
  }, [filterProductItems.length, searchSubmitted, searchTerm, category, loading]);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className='main-container'>
      <Filter
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setSearchSubmitted(false); // reset
        }}
        category={category}
        onCategory={(value) => {
          setCategory(value);
          setSearchSubmitted(false); // reset
        }}
        onSubmitClick={handleSubmit}
      />

      {showFlash && (
        <div className="flash-alert">
          {flashMessage}
          <button className="close-btn" onClick={() => {
            setSearchTerm("");
            setCategory("");
            setSearchSubmitted(false);
            setFlashMessage("");
            setShowFlash(false);
          }
        }
        >×</button>
        </div>
      )}

      <div className='product-container'>
        {filterProductItems.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '100px' }} />
            <div className='product-info'>
              <span>{product.name} | Price: ${product.price_in_cents}</span> 
              <span>{product.description}</span>
              <span>Sold by: {product.user?.first_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
