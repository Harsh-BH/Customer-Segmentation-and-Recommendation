import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase"; // Ensure the path is correct
import "./HomePage.css";

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleCatalogClick = async (category) => {
    if (currentUser) {
      try {
        const userRef = doc(db, "customers", currentUser.uid); // Reference to the customer's document
        await updateDoc(userRef, {
          "place.NumCatalogPurchases": increment(1), // Increment catalog purchases
        });
        console.log(
          `Incremented NumCatalogPurchases for user ${currentUser.uid}`
        );
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
    navigate(`/products/${category}`);
  };

  const handleDiscountClick = async (category, campaign) => {
    if (currentUser) {
      try {
        const userRef = doc(db, "customers", currentUser.uid); // Reference to the customer's document
        await updateDoc(userRef, {
          [`promotion.${campaign}`]: increment(1), // Increment the specific campaign
        });
        console.log(`Incremented ${campaign} for user ${currentUser.uid}`);
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
    navigate(`/products/${category}?discount=true`);
  };

  return (
    <div className="homepage-container">
      <header>
        <h1>Welcome to Our E-commerce Site</h1>
        {currentUser ? (
          <div className="user-info">
            <p>Hello, {currentUser.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
      <div className="catalog-container">
        <h2>Product Catalogs</h2>
        <div className="catalog-grid">
          <button
            onClick={() => handleCatalogClick("wineProducts")}
            className="catalog-item"
          >
            Wines
          </button>
          <button
            onClick={() => handleCatalogClick("fruitProducts")}
            className="catalog-item"
          >
            Fruits
          </button>
          <button
            onClick={() => handleCatalogClick("meatProducts")}
            className="catalog-item"
          >
            Meat
          </button>
          <button
            onClick={() => handleCatalogClick("fishProducts")}
            className="catalog-item"
          >
            Fish
          </button>
          <button
            onClick={() => handleCatalogClick("sweets")}
            className="catalog-item"
          >
            Sweets
          </button>
          <button
            onClick={() => handleCatalogClick("goldProducts")}
            className="catalog-item"
          >
            Gold
          </button>
        </div>
      </div>
      <div className="discount-container">
        <h2>Discount Offers</h2>
        <div className="discount-grid">
          <button
            onClick={() => handleDiscountClick("wineProducts", "AcceptedCmp1")}
            className="discount-item"
          >
            Wine Discount
          </button>
          <button
            onClick={() => handleDiscountClick("fruitProducts", "AcceptedCmp2")}
            className="discount-item"
          >
            Fruit Discount
          </button>
          <button
            onClick={() => handleDiscountClick("meatProducts", "AcceptedCmp3")}
            className="discount-item"
          >
            Meat Discount
          </button>
          <button
            onClick={() => handleDiscountClick("fishProducts", "AcceptedCmp4")}
            className="discount-item"
          >
            Fish Discount
          </button>
          <button
            onClick={() => handleDiscountClick("sweets", "AcceptedCmp5")}
            className="discount-item"
          >
            Sweets Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
