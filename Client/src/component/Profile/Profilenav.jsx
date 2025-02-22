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
                    <span>My Orders</span>
                </li>
                <li>
                    <span>My Favourites</span>
                </li>
            </ul>
        </div >
    </>
  );
}

export default Profilenav;