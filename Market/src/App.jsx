import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
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

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar showNavbar={true} />}
      <div className={isLoginPage ? "" : "main-content"}>{children}</div>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
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
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
