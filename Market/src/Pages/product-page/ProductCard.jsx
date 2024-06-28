import "../product-page/styles.css";

const ProductCard = ({ image, name, oldPrice, newPrice, backgroundColor }) => {
  return (
    <article className="card" style={{ backgroundColor }}>
      <div className="card__img">
        <img src={image} alt={name} />
      </div>
      <div className="card__name">
        <p>{name}</p>
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
    </article>
  );
};

export default ProductCard;
