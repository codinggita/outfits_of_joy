import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../assets/navimg.png';
import img2 from '../assets/logo1.png';
import { FaRegHeart } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import './Navbar.css'
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDetails } from "../component/Profile/Api.js";
import { useUser } from "../component/UserContext.jsx";
import useCart from "./Hooks/useCart.jsx";
import { toast } from "react-toastify";

function Navbar() {
  const { setUserId, setFirstName, setLastName, setEmail, setPhone } = useUser();
  const { loginWithPopup, isLoading, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    const getUser = async () => {
      if (!user?.email) return;

      try {
        const data = await getUserDetails(user?.email);
        if (data) {
          setUserId(data._id);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhone(data.phone)
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, [user?.email]);

  const successmsg = (() => {
    toast.success("Login Successful", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();

    // Define route mapping
    const routeMapping = {
      "sherwani": "malecollection/sherwani",
      "indo-western": "malecollection/indo-western",
      "tuxedo": "malecollection/tuxedo",
      "lehengha": "femalecollection/lehenga",
      "anarkali": "femalecollection/anarkali",
      "gown": "femalecollection/gown"
    };

    // Check if search query exists in the mapping
    if (routeMapping[query]) {
      navigate(routeMapping[query]); // Navigate to the new route
      // window.location.reload(); // Reload the page
    } else {
      toast.warn("No matching category found!");
    }

    // Clear input after search
    setSearchQuery("");
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
                <Link to='/womens-outfits' >
                  WOMENS WEAR
                </Link>
              </li>
              <li>
                <Link to='/mens-outfits' >
                  MENS WEAR
                </Link>
              </li>
              <li>
                <Link to='/our-stores' >
                  OUR STORES
                </Link>
              </li>
            </ul>
            <ul id='navicons'>
              <li>
                <form onSubmit={handleSearch} id='navsearch'>
                  <input
                    type="text"
                    list="searchOptions"
                    id='searchoutfits'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Outfits"
                    required
                  />
                  <datalist id="searchOptions">
                    <option value="Sherwani" />
                    <option value="Indo-Western" />
                    <option value="Tuxedo" />
                    <option value="Lehengha" />
                    <option value="Anarkali" />
                    <option value="Gown" />
                  </datalist>
                  <button type="submit" aria-label="Search" className='hint--bottom hint--bounce'><BiSearchAlt /></button>
                </form>
              </li>
              <li><Link to="/profile/favourites" aria-label="Favorites" className='hint--bottom hint--bounce'><FaRegHeart /></Link></li>
              <li id='cartnav' aria-label="Cart" className='hint--bottom hint--bounce'><Link to="/profile/cart">{totalItems > 0 ? <span id='cartitemcounts'>{totalItems}</span> : null}<IoMdCart /></Link></li>
              <li>
                <div id="navsignin">
                  {isLoading ? (
                    <p id="spinner" style={{ textAlign: "center" }}><span className="loader"></span></p>
                  ) : isAuthenticated ? (
                    <div style={{ cursor: "pointer" }}>
                      <Link to="/profile">
                        <img
                          src={user?.picture || "https://www.svgrepo.com/download/192247/man-user.svg"}
                          alt="Profile"
                          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                          onError={(e) => {
                            e.target.src = "https://www.svgrepo.com/download/192247/man-user.svg";
                          }}
                        />
                      </Link>
                    </div>
                  ) : (
                    <div
                      id='signin'
                      onClick={async () => {
                        try {
                          await loginWithPopup();
                          await getAccessTokenSilently();
                          navigate("/profile");
                          successmsg()
                        } catch (error) {
                          console.error("Login failed:", error);
                        }
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