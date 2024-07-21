import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";

const Navbar = ({ showNavbar }) => {
  const { currentUser, logout } = useAuth();
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  if (!showNavbar) {
    return null;
  }

  return (
    <nav className={`navbar ${visible ? "navbar-visible" : "navbar-hidden"}`}>
      <div className="navbar-logo">Logo</div>
      <ul className="navbar-links">
        <li>
          <Link to="/homePage">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {currentUser && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
