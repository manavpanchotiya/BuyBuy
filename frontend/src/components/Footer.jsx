import React from "react";
import About from "../pages/About";
import { Link } from "react-router-dom";
import '../styles/footer_styles.css'

export default function Footer(){
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">
      &copy;{currentYear} BuyBuy, All rights reserved
      </p>  
      <Link to="/about">About Us</Link>

  

    </footer>
  )
}
