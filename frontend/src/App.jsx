import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import SellerProducts from "./pages/Seller";
import NewProduct from "./pages/NewProductsForm";

export default function App() {
  return (
    <div className="header_routes">
      <div style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/seller" element={<SellerProducts />} />
          <Route path="/seller/new" element={<NewProduct />} />
          <Route path="/login" element={<SellerProducts />} />
        </Routes>
      </div>

      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <Link to="/about">About Us</Link>
      </footer>
    </div>
  );
}
