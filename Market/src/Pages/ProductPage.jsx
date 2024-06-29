import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "../Pages/product-page/ProductList";

const ProductPage = () => {
  const { category } = useParams();

  return (
    <div>
      <h1 className="title-shop">SHOP</h1>
      <ProductList category={category} />
    </div>
  );
};

export default ProductPage;
