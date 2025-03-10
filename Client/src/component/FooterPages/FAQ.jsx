import React, { useEffect } from 'react';
import './FooterPages.css'; 
import { Link } from 'react-router-dom';

const FAQ = () => {
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    
    return (
        <div className="faq-container">
            <header className="faq-header">
                <h1>Frequently Asked Questions (FAQs)</h1>
                <p>Welcome to the <span className="brand-name">Outfits of Joy</span> FAQ page! Here, you’ll find answers to the most common questions about our rental services. If you don’t find what you’re looking for, feel free to <a href="/help-and-support">contact us</a>.</p>
            </header>

            <section className="faq-content">
                <h2>General Questions</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>How do I rent an outfit?</h3>
                        <p>
                            Renting an outfit is simple! Browse our collection, select your desired outfit, choose your rental dates, and proceed to checkout. You’ll receive a confirmation email with all the details.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>What is the rental duration?</h3>
                        <p>
                            The standard rental duration is 4 days. If you need the outfit for a longer period, please contact our support team for assistance.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>Can I cancel my rental?</h3>
                        <p>
                            Yes, you can cancel your rental. If you cancel more than 7 days before the rental period, you’ll receive a full refund. Cancellations within 7 days of the rental period will incur a 50% cancellation fee.
                        </p>
                    </div>
                </div>
            </section>

            <section className="faq-content">
                <h2>Payments and Pricing</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>What payment methods do you accept?</h3>
                        <p>
                            We accept all major credit cards, debit cards, and other payment methods as specified on our website.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>Is there a security deposit?</h3>
                        <p>
                            Yes, a security deposit of ₹10,000 is required at the time of booking. This deposit will be refunded after deducting the rental fee, provided the outfit is returned on time and in good condition.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>Are there any additional charges?</h3>
                        <p>
                            Additional charges may apply for late returns, damage, or loss of the outfit. Please refer to our <a href="/return-and-refund">Return and Refund Policy</a> for more details.
                        </p>
                    </div>
                </div>
            </section>

            <section className="faq-content">
                <h2>Returns and Refunds</h2>
                <div className="faq-list">
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
                        <h3>How long does it take to process a refund?</h3>
                        <p>
                            Refunds are processed within 7-10 business days after we receive the returned outfit and verify its condition.
                        </p>
                    </div>
                </div>
            </section>

            <section className="faq-content">
                <h2>Hygiene and Care</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>Are the outfits cleaned and sanitized?</h3>
                        <p>
                            Yes, every outfit is professionally dry-cleaned, sanitized, and ironed before and after each rental. Your safety and satisfaction are our top priorities.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>What if the outfit is damaged during my rental period?</h3>
                        <p>
                            If the outfit is damaged, please contact us immediately. Repair or replacement costs will be deducted from your security deposit.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="faq-footer">
                <p>Still have questions? Visit our <Link to="/help-and-support">Help and Support</Link> page or contact us at <a href="mailto:support@outfitsofjoy.com">support@outfitsofjoy.com</a>.</p>
            </footer>
        </div>
    );
};

export default FAQ;