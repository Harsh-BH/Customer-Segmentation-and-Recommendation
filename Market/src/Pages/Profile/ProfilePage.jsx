import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Ensure the path is correct
import { db } from "../../firebase"; // Ensure the path is correct
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./styles.css";

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState({
    id: "",
    year_birth: "",
    education: "",
    marital_status: "",
    income: "",
    kidhome: "",
    teenhome: "",
    dt_customer: "",
    recency: "",
    complain: "",
    purchases: {
      wines: 0,
      fruits: 0,
      meat: 0,
      fish: 0,
      sweets: 0,
      gold: 0,
    },
    promotion: {
      NumDealsPurchases: 0,
      AcceptedCmp1: 0,
      AcceptedCmp2: 0,
      AcceptedCmp3: 0,
      AcceptedCmp4: 0,
      AcceptedCmp5: 0,
      Response: 0,
    },
    place: {
      NumWebPurchases: 0,
      NumCatalogPurchases: 0,
      NumStorePurchases: 0,
      NumWebVisitsMonth: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, "customers", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Ensure nested objects are not null or undefined
          setCustomer({
            ...data,
            purchases: data.purchases || {
              wines: 0,
              fruits: 0,
              meat: 0,
              fish: 0,
              sweets: 0,
              gold: 0,
            },
            promotion: data.promotion || {
              NumDealsPurchases: 0,
              AcceptedCmp1: 0,
              AcceptedCmp2: 0,
              AcceptedCmp3: 0,
              AcceptedCmp4: 0,
              AcceptedCmp5: 0,
              Response: 0,
            },
            place: data.place || {
              NumWebPurchases: 0,
              NumCatalogPurchases: 0,
              NumStorePurchases: 0,
              NumWebVisitsMonth: 0,
            },
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setCustomer({ ...customer, [name]: value });
    } else {
      setCustomer({
        ...customer,
        [keys[0]]: {
          ...customer[keys[0]],
          [keys[1]]: value,
        },
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      await setDoc(doc(db, "customers", currentUser.uid), customer);
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <div className="customer-container">
      <h1>Profile Page</h1>
      {Object.keys(customer).map((key) => {
        if (typeof customer[key] !== "object") {
          return (
            <div className="customer-field" key={key}>
              <label>{key.replace("_", " ")}:</label>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={customer[key]}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{customer[key]}</span>
              )}
            </div>
          );
        }
        return null;
      })}
      <h2>Purchases</h2>
      {customer.purchases &&
        Object.keys(customer.purchases).map((key) => (
          <div className="customer-field" key={key}>
            <label>{key.replace("_", " ")}:</label>
            {isEditing ? (
              <input
                type="number"
                name={`purchases.${key}`}
                value={customer.purchases[key]}
                onChange={handleInputChange}
              />
            ) : (
              <span>{customer.purchases[key]}</span>
            )}
          </div>
        ))}
      <h2>Promotion</h2>
      {customer.promotion &&
        Object.keys(customer.promotion).map((key) => (
          <div className="customer-field" key={key}>
            <label>{key.replace("_", " ")}:</label>
            {isEditing ? (
              <input
                type="number"
                name={`promotion.${key}`}
                value={customer.promotion[key]}
                onChange={handleInputChange}
              />
            ) : (
              <span>{customer.promotion[key]}</span>
            )}
          </div>
        ))}
      <h2>Place</h2>
      {customer.place &&
        Object.keys(customer.place).map((key) => (
          <div className="customer-field" key={key}>
            <label>{key.replace("_", " ")}:</label>
            {isEditing ? (
              <input
                type="number"
                name={`place.${key}`}
                value={customer.place[key]}
                onChange={handleInputChange}
              />
            ) : (
              <span>{customer.place[key]}</span>
            )}
          </div>
        ))}
      <button onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Profile;
