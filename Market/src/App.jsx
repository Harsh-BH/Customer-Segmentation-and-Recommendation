import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import Navbar from "./Components/Navbar/Navbar";

// Define PrivateRoute component outside of App component
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated on app load

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar showNavbar={isAuthenticated} />
      <Routes>
        {/* Route for homePage */}
        <Route
          path="/homePage"
          element={
            <PrivateRoute
              element={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {/* Route for products */}
        <Route
          path="/products"
          element={
            <PrivateRoute
              element={<ProductPage />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {/* Fallback route, redirect to homePage */}
        <Route path="*" element={<Navigate to="/homePage" />} />
      </Routes>
    </Router>
  );
}

export default App;
