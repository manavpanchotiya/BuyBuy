import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
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
import ChatPage from './pages/ChatPage';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [user, setUser] = useState(null);
  const [showSwappableOnly, setShowSwappableOnly] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3000/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .catch(console.error);
  };

  const handleSignup = (userData) => {
    console.log("User signed up:", userData);
    setUser(userData);
  };

  function ChatRouteWrapper() {
    const { receiverId } = useParams();

    if (!user) {
      return <div>Please login to chat</div>;
    }

    return (
      <ChatPage
        currentUserId={user.id}
        receiverId={parseInt(receiverId)}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'white'

      }}
    >
      {/* Main content grows to fill space */}
      <main style={{ flexGrow: 1 }}>
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
            <Route path="product/:id" element={<ProductDetails currentUserId={user?.id} />} />
            <Route path="about" element={<About />} />
            <Route path="seller" element={<SellerProducts />} />
            <Route path="seller/new" element={<NewProduct />} />
            <Route path="admin" element={<AdminDashboard user={user} />} />
            <Route path="login" element={<Login onLogin={setUser} />} />
            <Route path="signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="favourites" element={<FavouritesPage user={user} />} />
            <Route path="chats/:receiverId" element={<ChatRouteWrapper user={user} />} />
          </Route>
        </Routes>
      </main>

      {/* Footer sticks at bottom if content is short */}
      <Footer />
    </div>
  );
}
