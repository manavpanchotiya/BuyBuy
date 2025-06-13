import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import SellerProducts from "./pages/Seller";
import NewProduct from "./pages/NewProductsForm";
import Header from "./components/Header";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  const handleSubmit = () => {
    if (searchTerm === "" && category === "") {
      setFlashMessage("Please enter a search term or select a category.");
      setShowFlash(true);
    } else {
      setSearchSubmitted(true);
      setShowFlash(false);
    }
  };

  const closeFlash = () => {
    setSearchTerm("");
    setCategory("");
    setSearchSubmitted(false);
    setFlashMessage("");
    setShowFlash(false);
  };

  return (
    <div className="header_routes">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategory={setCategory}
        onSubmitClick={handleSubmit}
      />

      {showFlash && (
        <div className="flash-alert">
          {flashMessage}
          <button className="close-btn" onClick={closeFlash}>×</button>
        </div>
      )}

      <div style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product searchTerm={searchTerm} category={category} searchSubmitted={searchSubmitted} />} />
          <Route path="/seller" element={<SellerProducts />} />
          <Route path="/seller/new" element={<NewProduct />} />
          <Route path="/login" element={<SellerProducts />} />
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </div>

      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <Link to="/about">About Us</Link>
      </footer>
    </div>
  );
}
