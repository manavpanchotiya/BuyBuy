import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useParams } from "react-router-dom";

import Layout from './pages/Layout';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer'
import SellerProducts from './pages/Seller';
import NewProduct from './pages/NewProductsForm';
import ChatPage from './pages/ChatPage';
import ChatWrapper from './components/ChatWrapper';



export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  function ChatRouteWrapper() {
    const { receiverId } = useParams();
    const currentUserId = 1; // Get from auth context or props
    return <ChatPage currentUserId={currentUserId} receiverId={parseInt(receiverId)} />;
  }

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
        <Route path="/chats/:receiverId" element={<ChatWrapper />} />
        
      </Route>
    </Routes>
<div>
<Footer />
</div>
     
    </div>

    
  );
}