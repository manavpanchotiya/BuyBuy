import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import SellerProducts from "./pages/Seller";

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/products">View Products</Link> |{" "}
        <Link to="/seller">Seller Products</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/login">Sign Up</Link>
      </nav>

      <div style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/seller" element={<SellerProducts />} />
          <Route path="/login" element={<SellerProducts />} />
        </Routes>
      </div>

      <footer style={{ padding: '1rem', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
        <Link to="/about">About Us</Link>
      </footer>
    </div>
  );
}
