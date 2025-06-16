import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import SellerProducts from './pages/Seller';
import NewProduct from './pages/NewProductsForm';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FavouritesPage from './pages/Favourites';


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState(null);

  // Logout handler - calls backend logout and clears user state
  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(() => setUser(null))
      .catch(console.error);
  };

  // Handler for successful signup (or login)
  const handleSignup = (userData) => {
    console.log("User signed up:", userData);
    setUser(userData); // You can set the user state here if needed
  };

  return (
    <div className='main_container'> 
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              user={user}
              onLogout={handleLogout}
              searchTerm={searchTerm}
              category={category}
              onSearchChange={setSearchTerm}
              onCategoryChange={setCategory}
              
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Product searchTerm={searchTerm} category={category} />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="seller" element={<SellerProducts />} />
          <Route path='seller/new' element={<NewProduct />} />
          <Route path='/admin' element={<AdminDashboard user={ user } />} />
          <Route path='/login' element={<Login onLogin={setUser} />} />
          <Route path='/signup' element={<Signup onSignup={handleSignup} />} />
          <Route path='/favourites' element={<FavouritesPage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}
