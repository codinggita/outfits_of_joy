import React from 'react';
import './Profilenav.css';
import { Link, useLocation } from 'react-router-dom';

function Profilenav() {
    const location = useLocation();

    return (
        <>
            <div id='profilenav'>
                <ul>
                    <li>
                        <Link to="/Profile" className={location.pathname === "/Profile" ? "active" : ""} >
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Profile/address" className={location.pathname === "/Profile/address" ? "active" : ""}>
                            <span>My Address</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Profile/orders" className={location.pathname === "/Profile/orders" ? "active" : ""}>
                            <span>My Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Profile/favourites" className={location.pathname === "/Profile/favourites" ? "active" : ""}>
                            <span>My Favourites</span>
                        </Link>
                    </li>
                </ul>
            </div >
        </>
    );
}

export default Profilenav;