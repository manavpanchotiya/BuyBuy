import React from "react";
import Product from "./Product";


export default function ProductDetails() {
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


  return 
  (
     <div className='product-container'>
            {filterProductItems.map((product) => (
              <div key={product.id} style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>
    
                <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} /* style={{ width: '150px', height: '100px' }} */ />
                </Link>
                <div className='product-info'>
                  <span>{product.name} | Price: ${(product.price_in_cents / 100).toFixed(2)}</span> 
                  <span>{product.description}</span>
                  <span>Sold by: {product.user?.first_name}</span>
                </div>
              </div>
            ))}
          </div>
  )
}