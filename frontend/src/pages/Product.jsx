import React, { useEffect, useState } from 'react';
import '../../public/products_styles.css'
import Filter from '../components/Filter';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("")

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



  const matchesSearchTerm = (product) => {
    const firstName = product.user?.first_name?.toLowerCase() || "";
    const userLocation = product.user?.user_location?.toLowerCase() || "";
  
    return (
      firstName.includes(searchTerm.toLowerCase()) ||
      userLocation.includes(searchTerm.toLowerCase())
    );
  };
  

  const matchesCategory = (product, category) => {
    if (!category || category === "All Categories"){
      return true;
    }
    return product.category?.name === category;
  };

const filterProductItems = products.filter(
  (product) =>
    matchesSearchTerm(product, searchTerm) && matchesCategory(product,category)
);

  return (
    <div className='main-container'>
      <Filter
      searchTermearchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      category={category}
      onCategoryChange={setCategory}
       />
    <div className='product-container'>
      
      {filterProductItems.map((product) => (
        <div key={product.id} 
        style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>

          <img src={product.image} alt={product.name} style={{ width: '150px', height:'100px'}} />

          <div className='product-info'>
         <span>{product.name} | Price: ${product.price_in_cents}</span> 
          <span> {product.description}</span>
          <span>Sold by: {product.user?.first_name}</span>
          {/* Hidden category, location (stored for filtering later) */}
          <p style={{ display: 'none' }}>{product.category?.name}</p>
          <p style={{ display: 'none' }}>{product.user?.user_location}</p>
            </div>                   
        </div>
      ))}
    </div>
    </div>
  );
}

export default Product;
