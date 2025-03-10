import React, { useEffect } from 'react';
import './FooterPages.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>Welcome to <span className="brand-name">Outfits of Joy</span>, your ultimate destination for renting stunning outfits for every special occasion!</p>
      </header>

      <section className="about-us-story">
        <h2>Our Story</h2>
        <p>
          Outfits of Joy was born out of a simple idea: to make high-fashion accessible and affordable for everyone. We understand that life is full of memorable moments, and each one deserves a special outfit. However, buying a new outfit for every occasion can be expensive and impractical. That’s where we come in! We offer a curated selection of premium outfits for rent, so you can shine at every event without breaking the bank.
        </p>
      </section>

      <section className="about-us-offer">
        <h2>What We Offer</h2>
        <div className="outfit-grid">
          <div className="outfit-card1">
            <h3>Sherwanis</h3>
            <p>Regal and timeless, perfect for grooms and wedding guests.</p>
          </div>
          <div className="outfit-card1">
            <h3>Tuxedos</h3>
            <p>Sleek and sophisticated for formal events and parties.</p>
          </div>
          <div className="outfit-card1">
            <h3>Indo-Western</h3>
            <p>A fusion of traditional and contemporary styles for the modern trendsetter.</p>
          </div>
          <div className="outfit-card1">
            <h3>Lehengas</h3>
            <p>Elegant and glamorous, ideal for weddings and festive celebrations.</p>
          </div>
          <div className="outfit-card1">
            <h3>Anarkalis</h3>
            <p>Graceful and classic, a favorite for traditional events.</p>
          </div>
          <div className="outfit-card1">
            <h3>Gowns</h3>
            <p>Chic and stylish, perfect for proms, galas, and cocktail parties.</p>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Affordable Luxury</h3>
            <p>Rent designer outfits at a fraction of the cost.</p>
          </div>
          <div className="benefit-card">
            <h3>Wide Variety</h3>
            <p>From traditional to modern, we have something for everyone.</p>
          </div>
          <div className="benefit-card">
            <h3>Convenience</h3>
            <p>Easy online booking and hassle-free delivery.</p>
          </div>
          <div className="benefit-card">
            <h3>Quality Assurance</h3>
            <p>Every outfit is professionally cleaned and maintained.</p>
          </div>
          <div className="benefit-card">
            <h3>Sustainability</h3>
            <p>By renting, you contribute to a more sustainable fashion ecosystem.</p>
          </div>
        </div>
      </section>

      <section className="about-us-mission">
        <h2>Our Mission</h2>
        <p>
          At Outfits of Joy, our mission is to bring joy to your special moments by providing you with the perfect outfit. We strive to make fashion accessible, sustainable, and enjoyable for everyone.
        </p>
      </section>

      <footer className="about-us-footer">
        <p>Ready to find your next show-stopping outfit? <Link to="/">Explore our collection</Link> today and let us help you create unforgettable memories.</p>
      </footer>
    </div>
  );
};

export default AboutUs;