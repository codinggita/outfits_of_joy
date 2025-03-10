import React, { useEffect } from 'react';
import './FooterPages.css'; 

const TermsAndConditions = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  return (
    <div className="terms-and-conditions-container">
      <header className="terms-and-conditions-header">
        <h1>Terms and Conditions</h1>
        <p>Welcome to <span className="brand-name">Outfits of Joy</span>! These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing this website, you agree to comply with these terms.</p>
      </header>

      <section className="terms-and-conditions-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our website, you confirm that you are at least 18 years old and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
        </p>
      </section>

      <section className="terms-and-conditions-content">
        <h2>2. Rental Agreement</h2>
        <p>
          When you rent an outfit from Outfits of Joy, you agree to the following:
          <ul>
            <li>You will return the outfit in its original condition, free from damage or stains.</li>
            <li>You are responsible for any loss or damage to the outfit during the rental period.</li>
            <li>Late returns may incur additional charges.</li>
          </ul>
        </p>
      </section>

      <section className="terms-and-conditions-content">
        <h2>3. Payment and Pricing</h2>
        <p>
          All prices are listed in your local currency and are subject to change without notice. Payment must be made in full at the time of booking. We accept major credit cards and other payment methods as specified on our website.
        </p>
      </section>

      <section className="terms-and-conditions-content">
        <h2>4. Cancellations and Refunds</h2>
        <p>
          <ul>
            <li>Cancellations made more than 7 days before the rental period will receive a full refund.</li>
            <li>Cancellations made within 7 days of the rental period will incur a 50% cancellation fee.</li>
            <li>No refunds will be issued for cancellations made after the rental period has started.</li>
          </ul>
        </p>
      </section>

      <section className="terms-and-conditions-content">
        <h2>5. User Responsibilities</h2>
        <p>
          You agree to:
          <ul>
            <li>Provide accurate and complete information when creating an account or placing an order.</li>
            <li>Use our website only for lawful purposes.</li>
            <li>Not engage in any activity that disrupts or interferes with the website's functionality.</li>
          </ul>
        </p>
      </section>

      <section className="terms-and-conditions-content">
        <h2>6. Limitation of Liability</h2>
        <p>
          Outfits of Joy is not liable for any indirect, incidental, or consequential damages arising from the use of our website or services. Our total liability to you for any claim will not exceed the amount you paid for the rental.
        </p>
      </section>

      <section className="terms-and-conditions-content">
        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated terms.
        </p>
      </section>

      <footer className="terms-and-conditions-footer">
        <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@outfitsofjoy.com">support@outfitsofjoy.com</a>.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;