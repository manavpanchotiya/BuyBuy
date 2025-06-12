import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <div>
    {/*   <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/products">All Products</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}
