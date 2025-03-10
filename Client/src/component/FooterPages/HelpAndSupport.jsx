import React, { useEffect } from 'react';
import './FooterPages.css'; 

const HelpAndSupport = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  return (
    <div className="help-and-support-container">
      <header className="help-and-support-header">
        <h1>Help and Support</h1>
        <p>Welcome to the <span className="brand-name">Outfits of Joy</span> Help Center! We’re here to assist you with any questions or concerns you may have. Below, you’ll find answers to common questions and ways to contact our support team.</p>
      </header>

      <section className="help-and-support-content">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>How do I rent an outfit?</h3>
            <p>
              Renting an outfit is easy! Simply browse our collection, select your desired outfit, choose your rental dates, and proceed to checkout. You’ll receive a confirmation email with all the details.
            </p>
          </div>
          <div className="faq-item">
            <h3>What is the rental duration?</h3>
            <p>
              The standard rental duration is 4 days. If you need the outfit for a longer period, please contact our support team for assistance.
            </p>
          </div>
          <div className="faq-item">
            <h3>How do I return the outfit?</h3>
            <p>
              Pack the outfit securely in its original packaging and drop it off at our designated return location or schedule a pickup (if available). Make sure to include all accessories and tags.
            </p>
          </div>
          <div className="faq-item">
            <h3>What if the outfit doesn’t fit?</h3>
            <p>
              We recommend checking our size guide before renting. If the outfit doesn’t fit, please contact us immediately. Depending on availability, we may offer an exchange or refund.
            </p>
          </div>
          <div className="faq-item">
            <h3>How do I contact customer support?</h3>
            <p>
              You can reach our support team via email at <a href="mailto:support@outfitsofjoy.com">support@outfitsofjoy.com</a> or call us at <a href="tel:+911234567890">+91 12345 67890</a>. We’re available 24/7 to assist you.
            </p>
          </div>
        </div>
      </section>

      <section className="help-and-support-content">
        <h2>Contact Us</h2>
        <p>
          If you can’t find the answer to your question in our FAQs, feel free to reach out to us. We’re here to help!
        </p>
        <div className="contact-methods">
          <div className="contact-method">
            <h3>Email Support</h3>
            <p>
              <a href="mailto:support@outfitsofjoy.com">support@outfitsofjoy.com</a>
            </p>
          </div>
          <div className="contact-method">
            <h3>Phone Support</h3>
            <p>
              <a href="tel:+911234567890">+91 12345 67890</a>
            </p>
          </div>
        </div>
      </section>

      <footer className="help-and-support-footer">
        <p>Thank you for choosing <span className="brand-name">Outfits of Joy</span>! We’re committed to providing you with the best possible experience.</p>
      </footer>
    </div>
  );
};

export default HelpAndSupport;