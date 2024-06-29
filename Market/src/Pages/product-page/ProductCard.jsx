import React from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../firebase"; // Ensure the path is correct
import "./styles.css"; // Ensure the path is correct

const ProductCard = ({
  userId, // Pass the userId as a prop
  category, // Pass the product category as a prop
  id,
  image,
  name,
  oldPrice,
  newPrice,
  backgroundColor,
  description,
}) => {
  const handleBuyClick = async () => {
    try {
      const userRef = doc(db, "customers", userId); // Reference to the customer's document
      await updateDoc(userRef, {
        [`purchases.${category}`]: increment(1), // Increment the respective product purchase count
      });
      alert(`Bought ${name} for ${newPrice}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <article className="card" style={{ backgroundColor }}>
      <div className="card__img">
        <img src={image} alt={name} />
      </div>
      <div className="card__name">
        <p>{name}</p>
      </div>
      <div className="card__description">
        <p>{description}</p>
      </div>
      <div className="card__precis">
        <a href="#" className="card__icon">
          <ion-icon name="heart-outline"></ion-icon>
        </a>
        <div>
          <span className="card__preci card__preci--before">{oldPrice}</span>
          <span className="card__preci card__preci--now">{newPrice}</span>
        </div>
        <a href="#" className="card__icon">
          <ion-icon name="cart-outline"></ion-icon>
        </a>
      </div>
      <div className="card__buy-button">
        <button onClick={handleBuyClick}>Buy</button>
      </div>
    </article>
  );
};

export default ProductCard;
