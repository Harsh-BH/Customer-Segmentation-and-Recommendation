import React from "react";
import ProductCard from "../product-page/ProductCard";

const ProductList = () => {
  const products = [
    {
      image: "assets/img/img1.png",
      name: "AIR ZOOM PEGASUS",
      oldPrice: "$990.00",
      newPrice: "$749.00",
      backgroundColor: "var(--first-color)",
    },
    {
      image: "assets/img/img2.png",
      name: "AIR ZOOM PEGASUS",
      oldPrice: "$990.00",
      newPrice: "$749.00",
      backgroundColor: "var(--second-color)",
    },
    {
      image: "assets/img/img3.png",
      name: "AIR ZOOM PEGASUS",
      oldPrice: "$990.00",
      newPrice: "$749.00",
      backgroundColor: "var(--third-color)",
    },
    {
      image: "assets/img/img4.png",
      name: "AIR ZOOM PEGASUS",
      oldPrice: "$990.00",
      newPrice: "$749.00",
      backgroundColor: "var(--second-color)",
    },
  ];

  return (
    <main className="main bd-grid">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </main>
  );
};

export default ProductList;
