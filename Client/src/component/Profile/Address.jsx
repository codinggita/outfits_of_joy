import React, { useEffect, useState } from 'react'
import Profilenav from './Profilenav'
import './Address.css'
import { useAuth0 } from "@auth0/auth0-react";
import { getUserDetails, updateUserDetails } from './Api.js'
import { toast } from "react-toastify";

function Address() {
  const { user } = useAuth0();
  const [userData, setUserData] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    zip: "",
    city: "",
    district: "",
    state: ""
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
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
      setAddress({
        line1: userData.address?.line1 || "",
        line2: userData.address?.line2 || "",
        zip: userData.address?.zip || "",
        city: userData.address?.city || "",
        district: userData.address?.state || "",
        state: userData.address?.state || ""
      })
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails(userData._id, address, true);
      toast.success("Address updated successfully!", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error updating Address", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div id='profileview'>
        <Profilenav />
        <div id='info-logout'>
          <h2 id='Personalinfo'>Shipping Address :</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} >
            <div id='useraddress'>
              <div id="formlabels">
                <label>Address line 1 :
                </label>

                <label>Address line 2 :
                </label>

                <label>Pin Code :
                </label>

                <label>City :
                </label>

                <label>District :
                </label>

                <label>State :
                </label>

                <label>Country :
                </label>
              </div>

              <div id="forminputs">
                <input type="text" name="line1" id="address-line1" onChange={handleChange} value={address.line1} placeholder="Enter Address Line 1" />
                <input type="text" name="line2" id="address-line2" onChange={handleChange} value={address.line2} placeholder="Enter Address Line 2" />
                <input type="number" name="zip" id="pin-code" onChange={handleChange} value={address.zip} placeholder="Enter Your City's Pincode" />
                <input type="text" name="city" id="city" onChange={handleChange} value={address.city} placeholder="Enter Your City" />
                <input type="text" name="district" id="district" onChange={handleChange} value={address.district} placeholder="Enter Your District" />
                <input type="text" name="state" id="state" onChange={handleChange} value={address.state} placeholder="Enter Your State" />
                <input type="text" name="country" id="country" onChange={handleChange} value="India" readOnly />
              </div>
            </div>
            <div id='savebtn'><button type="submit">Save</button></div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Address