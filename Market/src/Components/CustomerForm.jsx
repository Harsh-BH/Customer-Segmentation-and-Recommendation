// src/components/CustomerForm.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { CSVLink } from "react-csv";

const CustomerForm = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    ID: "",
    Year_Birth: "",
    Education: "",
    Marital_Status: "",
    Income: "",
    Kidhome: "",
    Teenhome: "",
    Dt_Customer: "",
    Recency: "",
    Complain: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "customers", currentUser.uid);
      await setDoc(docRef, formData, { merge: true });
      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ID"
        value={formData.ID}
        onChange={handleChange}
        placeholder="ID"
      />
      <input
        type="text"
        name="Year_Birth"
        value={formData.Year_Birth}
        onChange={handleChange}
        placeholder="Year of Birth"
      />
      <input
        type="text"
        name="Education"
        value={formData.Education}
        onChange={handleChange}
        placeholder="Education"
      />
      <input
        type="text"
        name="Marital_Status"
        value={formData.Marital_Status}
        onChange={handleChange}
        placeholder="Marital Status"
      />
      <input
        type="text"
        name="Income"
        value={formData.Income}
        onChange={handleChange}
        placeholder="Income"
      />
      <input
        type="text"
        name="Kidhome"
        value={formData.Kidhome}
        onChange={handleChange}
        placeholder="Number of Children"
      />
      <input
        type="text"
        name="Teenhome"
        value={formData.Teenhome}
        onChange={handleChange}
        placeholder="Number of Teenagers"
      />
      <input
        type="text"
        name="Dt_Customer"
        value={formData.Dt_Customer}
        onChange={handleChange}
        placeholder="Date of Enrollment"
      />
      <input
        type="text"
        name="Recency"
        value={formData.Recency}
        onChange={handleChange}
        placeholder="Recency"
      />
      <input
        type="text"
        name="Complain"
        value={formData.Complain}
        onChange={handleChange}
        placeholder="Complain"
      />
      <button type="submit">Submit</button>
      <CSVLink data={[formData]} filename={"customer_data.csv"}>
        Download CSV
      </CSVLink>
    </form>
  );
};

export default CustomerForm;
