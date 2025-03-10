import React, { useEffect } from 'react';
import './FooterPages.css';

const PrivacyPolicy = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  return (
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>Privacy Policy</h1>
        <p>At <span className="brand-name">Outfits of Joy</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website.</p>
      </header>

      <section className="privacy-policy-content">
        <h2>Information We Collect</h2>
        <p>
          We may collect the following types of information when you use our website:
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address.</li>
            <li><strong>Payment Information:</strong> Credit card details or other payment information (processed securely via third-party payment gateways).</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, and pages visited.</li>
          </ul>
        </p>
      </section>

      <section className="privacy-policy-content">
        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect for the following purposes:
          <ul>
            <li>To process and fulfill your orders.</li>
            <li>To communicate with you about your orders, account, or inquiries.</li>
            <li>To improve our website and services.</li>
            <li>To send promotional offers and updates (if you have opted in).</li>
          </ul>
        </p>
      </section>

      <section className="privacy-policy-content">
        <h2>Data Security</h2>
        <p>
          We take the security of your data seriously. We implement industry-standard measures to protect your information from unauthorized access, alteration, or disclosure. All payment transactions are encrypted using secure socket layer technology (SSL).
        </p>
      </section>

      <section className="privacy-policy-content">
        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services (e.g., payment gateways, analytics tools) that collect, monitor, and analyze information to improve our services. These third parties have their own privacy policies, and we encourage you to review them.
        </p>
      </section>

      <section className="privacy-policy-content">
        <h2>Your Rights</h2>
        <p>
          You have the right to:
          <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of receiving promotional communications.</li>
            <li>Request a copy of the data we hold about you.</li>
          </ul>
          To exercise these rights, please contact us at <a href="mailto:privacy@outfitsofjoy.com">privacy@outfitsofjoy.com</a>.
        </p>
      </section>

      <section className="privacy-policy-content">
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you via email if there are significant updates.
        </p>
      </section>

      <footer className="privacy-policy-footer">
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@outfitsofjoy.com">privacy@outfitsofjoy.com</a>.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;