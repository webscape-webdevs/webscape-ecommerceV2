import React, { useEffect, useState } from "react";
import "./landingPage.css";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import PumaShoes from "../../sampleImages/pumaShoes.png";
import Hero from "../../sampleImages/hero2.png";

function LandingPage() {
  const dummyAd = {
    productImage: PumaShoes,
    productTitle: "Test",
    productDescription: "TestDescription",
    productPrice: "90",
    productDiscount: "20",
    productRating: 3,
  };

  return (
    <div className="landingPage">
      <Navbar />
      <div className="landingPage-hero">
        <img src={Hero} alt="" />
      </div>
      <div className="landingPage-afterHero">
        <div style={{ display: "flex" }}>
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
        </div>
        <div style={{ display: "flex" }}>
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
          <ProductCard ad={dummyAd} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
