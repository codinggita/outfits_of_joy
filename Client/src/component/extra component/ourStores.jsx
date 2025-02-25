import React from 'react'
import "./ourStores.css"

function ourStores() {
    const store = {
        id: 1,
        name: "Outfits Of Joy",
        address: "Rai University SH144, Saroda, Gujarat 382260",
        phone: "+91 9898212522",
        email: "abcd#123@gmail.com",
        hours: "Mon-Sat: 10 AM - 9 PM",
        closedDays: "Sunday",
        collections: ["Wedding", "Traditional", "Party Wear"],
        services: ["Trial Rooms", "Custom Fitting", "Express Delivery"],
        paymentMethods: ["Cash", "Credit Card", "UPI"],
        offers: "10% off on first rental",
    };

    return (
        <div id='storesmain' style={{ position: "relative", top: "13vh", marginBottom: "20vh" }}>
            <div>
                <h1 style={{ margin: "0 3vw", paddingTop: "5vh" }} id='welcomestore'>Welcome to Our store </h1>
                <div className="store-card">
                    <h2 className="store-name">{store.name}</h2>
                    <p className="store-address">{store.address}</p>
                    <p className="store-phone">📞 {store.phone}</p>
                    <p className="store-email">📧 {store.email}</p>
                    <p className="store-hours">🕒 {store.hours}</p>
                    <p className="store-closed">🚫 Closed: {store.closedDays}</p>

                    <div className="store-info">
                        <h3>Collections:</h3>
                        <p>{store.collections.join(", ")}</p>
                    </div>

                    <div className="store-info">
                        <h3>Services:</h3>
                        <p>{store.services.join(", ")}</p>
                    </div>

                    <div className="store-info">
                        <h3>Payment Methods:</h3>
                        <p>{store.paymentMethods.join(", ")}</p>
                    </div>

                    <div className="store-offer">{store.offers}</div>
                </div>
            </div>
            <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2186.724680052045!2d72.47114699745345!3d22.81661849154449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e92d7452e8655%3A0x8b3fd7e0e7f3d3bb!2sRai%20University!5e0!3m2!1sen!2sin!4v1740424383822!5m2!1sen!2sin"
                style={{
                    width: "93%",
                    height: "75vh",
                    border: "5px solid black",
                    margin: "3vw",
                    borderRadius: "20px"
                }} // ✅ Correct way to use inline styles
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

        </div>
    )
}

export default ourStores