import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase"; // Ensure the path is correct
import ProductCard from "../product-page/ProductCard";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Ensure the path is correct
import "./styles.css"; // Ensure the path is correct

const collections = {
  fishProducts: "fishProducts",
  fruitProducts: "fruitProducts",
  goldProducts: "goldProducts",
  meatProducts: "meatProducts",
  sweets: "sweets",
  wineProducts: "wineProducts",
};

const ProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      let allProducts = [];
      try {
        for (const col in collections) {
          const productsCollection = collection(db, collections[col]);
          const productsSnapshot = await getDocs(productsCollection);
          const productsList = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            collection: col, // Store the collection (category) with each product
          }));
          console.log(`Fetched from ${collections[col]}: `, productsList); // Log fetched products
          allProducts = [...allProducts, ...productsList];
        }
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        console.log("All products: ", allProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Category parameter: ", category);
    if (category) {
      filterProducts(category);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const filterProducts = (category) => {
    console.log(`Filtering products for category "${category}"`);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.collection === collections[category]
      );
      console.log(`Filtered products for category "${category}":`, filtered);
      setFilteredProducts(filtered);
    }
  };

  const handleFilterClick = async (category) => {
    if (currentUser) {
      try {
        const userRef = doc(db, "customers", currentUser.uid); // Reference to the customer's document
        await updateDoc(userRef, {
          "place.NumCatalogPurchases": increment(0), // Increment catalog purchases
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

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => handleFilterClick("all")}>All</button>
        <button onClick={() => handleFilterClick("wineProducts")}>Wine</button>
        <button onClick={() => handleFilterClick("meatProducts")}>Meat</button>
        <button onClick={() => handleFilterClick("fishProducts")}>Fish</button>
        <button onClick={() => handleFilterClick("goldProducts")}>Gold</button>
        <button onClick={() => handleFilterClick("fruitProducts")}>
          Fruit
        </button>
        <button onClick={() => handleFilterClick("sweets")}>Sweets</button>
      </div>
      <main className="main bd-grid">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            userId={currentUser?.uid} // Pass the userId
            category={product.collection} // Pass the category
            id={product.id}
            image={product.ImageURL || "path/to/default/image.png"} // Ensure default image path is correct
            name={product.Name || product.name}
            newPrice={
              product.Price ? `${product.Price} €` : `${product.price} €`
            }
            backgroundColor="var(--first-color)" // Set a default or dynamic color if available
            description={product.Description || product.description}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductList;
