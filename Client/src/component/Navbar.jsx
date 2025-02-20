import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import img1 from '../assets/navimg.png';
import img2 from '../assets/logo1.png';
import { FaRegHeart } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import './Navbar.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { loginWithPopup, isLoading, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (user?.picture) {
      setProfilePic(user.picture);
    }
  }, [user]);


  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    console.log("Form submitted"); // Add your form submission logic here
  };
  return (
    <>
      <header>
        <nav>
          <div id='navbar'>
            <img src={img1} alt="" />
            <div id='navlogo'>
              <img src={img2} alt="" />
            </div>
            <ul id='navanchor'>
              <li>
                <Link to='/' >
                  HOME
                </Link>
              </li>
              <li>
                <Link to='/Womens-outfits' >
                  WOMENS WEAR
                </Link>
              </li>
              <li>
                <Link to='/Mens-outfits' >
                  MENS WEAR
                </Link>
              </li>
              <li><a href=''>OUR STORES</a></li>
            </ul>
            <ul id='navicons'>
              <li>
                <form onSubmit={handleFormSubmit} id='navsearch'>
                  <div><input type="text" placeholder='Search Outfits' /></div>
                  <button><BiSearchAlt /></button>
                </form>
              </li>
              <li><a href=''><FaRegHeart /></a></li>
              <li><a href=''><IoMdCart /></a></li>
              <li>
                <div id="navsignin">
                  {isLoading ? (
                    <p id="spinner" style={{ textAlign: "center"}}><span className="loader"></span></p> 
                  ) : isAuthenticated ? (
                    <div style={{ cursor: "pointer" }}>
                      <Link to="/Profile">
                        <img
                          src={user?.picture || "https://www.svgrepo.com/download/192247/man-user.svg"}
                          alt="Profile"
                          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                          onLoad={(e) => console.log("Profile loaded:", e.target.src)} 
                          onError={(e) => {
                            console.error("Image failed to load:", e.target.src);
                            e.target.src = "https://www.svgrepo.com/download/192247/man-user.svg"; 
                          }}
                        />
                      </Link>
                    </div>
                  ) : (
                    <div
                    id='signin'
                      onClick={async () => {
                        await loginWithPopup();
                      }}
                      style={{ cursor: "pointer", alignItems: "center" }}
                    >
                      <span><FaRegUserCircle /></span>
                      <div>Sign In</div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar