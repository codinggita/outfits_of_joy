import React, { useEffect } from 'react';
import './FooterPages.css'; 

const Hygiene = () => {
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    
    return (
        <div className="hygiene-container">
            <header className="hygiene-header">
                <h1>Hygiene and Care</h1>
                <p>At <span className="brand-name">Outfits of Joy</span>, your safety and satisfaction are our top priorities. We ensure that every outfit rented through us is thoroughly cleaned, sanitized, and maintained to the highest standards.</p>
            </header>

            <section className="hygiene-content">
                <h2>Our Hygiene Process</h2>
                <p>
                    We follow a rigorous hygiene process to ensure that every outfit you rent is fresh, clean, and ready to wear. Here’s how we do it:
                </p>
                <div className="hygiene-steps">
                    <div className="hygiene-step">
                        <h3>1. Inspection</h3>
                        <p>Every outfit is carefully inspected for damage, stains, or wear and tear before and after each rental.</p>
                    </div>
                    <div className="hygiene-step">
                        <h3>2. Dry Cleaning</h3>
                        <p>Outfits are professionally dry-cleaned using high-quality cleaning agents to remove dirt, stains, and odors.</p>
                    </div>
                    <div className="hygiene-step">
                        <h3>3. Sanitization</h3>
                        <p>After cleaning, outfits are sanitized using industry-standard methods to eliminate bacteria and germs.</p>
                    </div>
                    <div className="hygiene-step">
                        <h3>4. Ironing and Steaming</h3>
                        <p>Outfits are pressed and steamed to ensure they are wrinkle-free and look as good as new.</p>
                    </div>
                    <div className="hygiene-step">
                        <h3>5. Packaging</h3>
                        <p>Clean and sanitized outfits are carefully packed in protective covers to maintain their freshness until they reach you.</p>
                    </div>
                </div>
            </section>

            <section className="hygiene-content">
                <h2>Quality Assurance</h2>
                <p>
                    We take pride in delivering outfits that meet the highest standards of quality and hygiene. Our team follows strict protocols to ensure that every outfit is safe, clean, and ready for your special occasion.
                </p>
            </section>

            <section className="hygiene-content">
                <h2>Your Safety Matters</h2>
                <p>
                    We understand the importance of hygiene, especially when it comes to clothing. That’s why we go the extra mile to ensure that every outfit you rent from us is not only stylish but also safe and hygienic.
                </p>
            </section>

            <footer className="hygiene-footer">
                <p>Thank you for trusting <span className="brand-name">Outfits of Joy</span> for your fashion needs. We are committed to providing you with a safe and delightful experience.</p>
            </footer>
        </div>
    );
};

export default Hygiene;