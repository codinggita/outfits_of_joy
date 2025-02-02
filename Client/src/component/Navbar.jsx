import React from 'react';
import img1 from '../assets/dsaf.png';
import img2 from '../assets/logo1.png';
import { FaRegHeart } from "react-icons/fa6";
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import './Navbar.css'

function Navbar() {
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
              <li><a href=''>HOME</a></li>
              <li><a href=''>WOMENS WEAR</a></li>
              <li><a href=''>MENS WEAR</a></li>
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
              <li><a href=''><PiShoppingCartSimpleDuotone /></a></li>
              <li>
                <a href=''>
                  <div id='navsignin'>
                    <div><FaRegUserCircle /></div>
                    <div id='signin'>Sign In</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar