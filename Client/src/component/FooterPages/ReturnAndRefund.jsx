import React, { useEffect } from 'react';
import './FooterPages.css';

const ReturnAndRefund = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  
  return (
    <div className="return-and-refund-container">
      <header className="return-and-refund-header">
        <h1>Return and Refund Policy</h1>
        <p>At <span className="brand-name">Outfits of Joy</span>, we strive to ensure your satisfaction with our rental services. Please read our Return and Refund Policy carefully to understand your rights and responsibilities.</p>
      </header>

      <section className="return-and-refund-content">
        <h2>1. Deposit and Rental Fees</h2>
        <p>
          When you rent an outfit from us, if a <strong>deposit of ₹10,000</strong> is required at the time of booking. This deposit serves as a security against any damage, loss, or late return of the outfit. The rental fee (e.g., ₹9,000) will be deducted from the deposit, and the remaining amount (e.g., ₹1,000) will be refunded to you after the outfit is returned in good condition and on time.
        </p>
      </section>

      <section className="return-and-refund-content">
        <h2>2. Returns</h2>
        <p>
          You are required to return the rented outfit on or before the due date specified in your rental agreement. Late returns will incur additional charges as follows:
          <ul>
            <li><strong>2-3 days late:</strong> ₹500 per day.</li>
            <li><strong>4-7 days late:</strong> ₹1000 per day.</li>
            <strong>Beyond 7 days:</strong> The outfit will be considered sold, and you will be charged the full retail price.
          </ul>
        </p>
      </section>

      <section className="return-and-refund-content">
        <h2>3. Condition of Returns</h2>
        <p>
          Outfits must be returned in their original condition, free from damage, stains, or alterations. If the outfit is returned damaged or in an unacceptable condition, repair or replacement costs will be deducted from your deposit.
        </p>
      </section>

      <section className="return-and-refund-content">
        <h2>4. Refunds</h2>
        <p>
          Refunds are applicable under the following circumstances:
          <ul>
            <li>If you cancel your order more than 7 days before the rental period, you will receive a full refund of your deposit.</li>
            <li>If you cancel within 7 days of the rental period, a 50% cancellation fee will apply, and the remaining deposit will be refunded.</li>
            <li>No refunds will be issued for cancellations made after the rental period has started.</li>
            <li>If the outfit is returned on time and in good condition, the remaining deposit (after deducting the rental fee) will be refunded within 7-10 business days.</li>
          </ul>
        </p>
      </section>

      <section className="return-and-refund-content">
        <h2>5. How to Return</h2>
        <p>
          To return an outfit, follow these steps:
          <ul>
            <li>Pack the outfit securely in its original packaging.</li>
            <li>Include all accessories and tags.</li>
            <li>Drop off the package at our designated return location or schedule a pickup (if available).</li>
          </ul>
        </p>
      </section>

      <section className="return-and-refund-content">
        <h2>6. Refund Processing</h2>
        <p>
          Refunds will be processed within 7-10 business days after we receive the returned outfit and verify its condition. The refund will be credited to the original payment method used during the transaction.
        </p>
      </section>

      <section className="return-and-refund-content">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about our Return and Refund Policy, please contact us at <a href="mailto:support@outfitsofjoy.com">support@outfitsofjoy.com</a>.
        </p>
      </section>

      <footer className="return-and-refund-footer">
        <p>Thank you for choosing <span className="brand-name">Outfits of Joy</span>! We appreciate your understanding and cooperation.</p>
      </footer>
    </div>
  );
};

export default ReturnAndRefund;