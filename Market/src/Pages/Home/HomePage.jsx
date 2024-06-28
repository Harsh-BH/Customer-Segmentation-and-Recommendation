import React from "react";
import Slider from "react-slick";
import "./HomePage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <div className="product-info">
        <h3>{title}</h3>
        <p>{price}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const products = [
    {
      image: "boxer-shorts.jpg",
      title: "Jurassic Park: Logo Boxer Shorts",
      price: "₹449",
    },
    {
      image: "oversized-tshirt.jpg",
      title: "Marvel: Creative Chaos Oversized T-Shirts",
      price: "₹899",
    },
    {
      image: "white-shirt.jpg",
      title: "Cotton Linen: White",
      price: "₹1399",
    },
    {
      image: "ecru-beige-shirt.jpg",
      title: "Cotton Linen: Ecru Beige",
      price: "₹1399",
    },
  ];

  const recommendedProducts = [
    {
      image: "recommended-product1.jpg",
      title: "Recommended Product 1",
      price: "₹999",
    },
    {
      image: "recommended-product2.jpg",
      title: "Recommended Product 2",
      price: "₹799",
    },
    {
      image: "recommended-product3.jpg",
      title: "Recommended Product 3",
      price: "₹1199",
    },
    {
      image: "recommended-product4.jpg",
      title: "Recommended Product 4",
      price: "₹599",
    },
  ];

  return (
    <div className="homepage">
      <Slider {...bannerSettings} className="main-banner">
        <div>
          <img src="banner1.jpg" alt="Banner 1" />
          <div className="banner-text">
            <h2>All Jeans at Flat ₹1499</h2>
            <span className="launch-offer">Launch Period Offer</span>
          </div>
        </div>
        <div>
          <img src="banner2.jpg" alt="Banner 2" />
          <div className="banner-text">
            <h2>New Arrivals</h2>
            <span className="launch-offer">Special Offer</span>
          </div>
        </div>
      </Slider>

      <div className="container">
        <div className="categories">
          <h2>Categories</h2>
          <div className="category-list">
            <div className="category-item">
              <img src="oversized-tshirts.jpg" alt="Oversized T-Shirts" />
              <p>Oversized T-Shirts</p>
            </div>
            <div className="category-item">
              <img src="jeans.jpg" alt="Jeans" />
              <p>Jeans</p>
            </div>
            <div className="category-item">
              <img src="shirts.jpg" alt="Shirts" />
              <p>Shirts</p>
            </div>
          </div>
        </div>

        <div className="new-arrivals">
          <h2>New Arrivals</h2>
          <div className="product-list">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>

        <div className="recommended-products">
          <h2>More Products Like These</h2>
          <div className="product-list">
            {recommendedProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
