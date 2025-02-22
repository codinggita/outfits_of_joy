import React, { useEffect, useState } from 'react'
import './Profileview.css'
import { FiLogOut } from "react-icons/fi";
import Profilenav from './Profilenav'
import { FaEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDetails, updateUserDetails } from './Api.js'

function Profileview() {
  const { user, logout } = useAuth0();
  const [userData, setUserData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getProduct = async () => {
      if (!user?.email) return;

      try {
        const data = await getUserDetails(user?.email);
        if (data) {
          setUserData(data);
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getProduct();
  }, [user?.email]);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(userData._id, formData, false);
      alert("Profile updated successfully!");
      setShowPopup(false);
    } catch (error) {
      alert("Error updating profile");
    }
  };
  return (
    <>
      <div id='profileview'>
        <Profilenav />
        <div id='info-logout'>
          <h2 id='Personalinfo'>Personal Information :</h2>
          <h2 id='Personalinfo' className='logout' onClick={() => logout({ returnTo: 'http://localhost:5173/' })}><FiLogOut /> LogOut</h2>
        </div>
        <div id='profileinfo'>
          <div>
            <img
              src={user?.picture || "https://www.svgrepo.com/download/192247/man-user.svg"}
              alt="Profile"
              style={{ width: "10vw", height: "10vw", borderRadius: "50%" }}
              onLoad={(e) => console.log("Profile loaded:", e.target.src)}
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.src = "https://www.svgrepo.com/download/192247/man-user.svg";
              }}
            />
          </div>
          <div id='userinfo'>
            <h1>{userData.firstName} {userData.lastName}</h1>
            <p>{userData.email}</p>
            <p>
              Phone : {userData?.phone ? (
                `+91 ${userData.phone}`
              ) : (
                <span id="userphone">Update your phone number</span>
              )}
            </p>
            <p id='edituser' onClick={() => setShowPopup(true)} ><span>Edit Profile</span> <FaEdit /></p>

            {/* Popup Form */}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup">
                  <button className="close-btn" onClick={() => setShowPopup(false)}>
                    <IoIosCloseCircleOutline />
                  </button>

                  <form onSubmit={handleSubmit}>

                    <div id='userform'>
                      <div id='formlabels'>
                        <label>First Name :
                        </label>

                        <label>Last Name :
                        </label>

                        <label>Email :
                        </label>

                        <label>Phone No. :
                        </label>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                        <br />

                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                        <br />

                        <input type="email" value={formData.email} disabled /><br />

                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        /><br />

                      </div>
                    </div>

                    <div id='savebtn'><button type="submit">Save</button></div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id='addressinfo'>
          <h2 id='shippinginfo'>Shipping Address :</h2>
          <p><span>Address :</span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit vel eos, voluptates ea blanditiis magni odit sit voluptatum minus deleniti nesciunt molestias corporis numquam adipisci assumenda beatae amet dolorum asperiores!</p>
          <p><span>City :</span> Dhrangadhra (363310)</p>
          <p><span>District :</span> Surendranagar</p>
          <p><span>State :</span> Gujarat</p>
          <p><span>Country :</span> India</p>
        </div>
      </div>
    </>
  )
}

export default Profileview