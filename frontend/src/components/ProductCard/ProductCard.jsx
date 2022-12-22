import React from "react";
import ReactStars from "react-rating-stars-component";

function ProductCard(props) {
  let priceToSubtract = (parseInt(props.ad.productPrice) * parseInt(props.ad.productDiscount)) / 100;
  let finalPrice = parseInt(props.ad.productPrice) - parseInt(priceToSubtract);

  return (
    <div className="productCard">
      <div className="productCard-feedbackButtons"></div>
      <div className="productCard-img">
        <img src={props.ad.productImage} alt="" />
      </div>
      <div className="productCard-text">
        <h1>{props.ad.productTitle}</h1>
        <h4>{props.ad.productDescription}</h4>
        <div className="productCard-price">
          <span className="productCard-price-discountedValue">₹ {finalPrice}</span>
          <span className="productCard-price-actualValue">₹ {props.ad.productPrice}</span>
          <span className="productCard-price-discount">({props.ad.productDiscount}% OFF)</span>
        </div>
        <ReactStars classNames="rating" count={5} value={props.ad.productRating} edit={false} size={40} activeColor="#ffd700" />
      </div>
      {/* <div className="productCard-addToCart">
        <span>ADD TO CART</span>
      </div> */}
    </div>
  );
}

export default ProductCard;
