import React from "react";
import { Link } from "react-router-dom"; // Assuming you use React Router
import "./navbar.css"; // Import your CSS file

const Navbar = ({ showNavbar }) => {
  if (!showNavbar) {
    return null; // Don't render the navbar if showNavbar is false
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <ul className="navbar-links">
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
