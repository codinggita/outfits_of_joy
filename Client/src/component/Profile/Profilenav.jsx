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
                        <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""} >
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/address" className={location.pathname === "/profile/address" ? "active" : ""}>
                            <span>My Address</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/orders" className={location.pathname === "/profile/orders" ? "active" : ""}>
                            <span>My Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile/favourites" className={location.pathname === "/profile/favourites" ? "active" : ""}>
                            <span>My Favourites</span>
                        </Link>
                    </li>
                </ul>
            </div >
        </>
    );
}

export default Profilenav;