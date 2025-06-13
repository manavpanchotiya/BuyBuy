import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer'
import SellerProducts from './pages/Seller';
import NewProduct from './pages/NewProductsForm';


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className='main_container'> 
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            searchTerm={searchTerm}
            category={category}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategory}
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="products" element={<Product searchTerm={searchTerm} category={category} />} />
        <Route path="product/:id" element={<ProductDetails/>} />
        <Route path="about" element={<About />} />
        <Route path="seller" element={<SellerProducts />} />
        <Route path='seller/new' element={<NewProduct />} />

        
      </Route>
    </Routes>
<div>
<Footer />
</div>
     
    </div>

    
  );
}