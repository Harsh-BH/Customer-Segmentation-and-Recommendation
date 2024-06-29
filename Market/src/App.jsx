import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import ProductPage from "./Pages/ProductPage";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar showNavbar={true} />
        <Routes>
          <Route
            path="/homePage"
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/products/:category"
            element={<PrivateRoute element={<ProductPage />} />}
          />
          <Route
            path="/products"
            element={<PrivateRoute element={<ProductPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/homePage" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
