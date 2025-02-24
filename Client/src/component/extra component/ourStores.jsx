import React from 'react'

function ourStores() {
    return (
        <div style={{position:"relative", top:"13vh", marginBottom:"20vh"}}>
            <h1 style={{margin:"0 3vw", paddingTop:"5vh"}} id='welcomestore'>Welcome to Our store </h1>
            <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2186.724680052045!2d72.47114699745345!3d22.81661849154449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e92d7452e8655%3A0x8b3fd7e0e7f3d3bb!2sRai%20University!5e0!3m2!1sen!2sin!4v1740424383822!5m2!1sen!2sin"
                style={{
                    width: "93%", 
                    height: "100vh", 
                    border: "5px solid black",
                    margin:"3vw"
                }} // ✅ Correct way to use inline styles
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

        </div>
    )
}

export default ourStores