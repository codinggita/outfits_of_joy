import React from 'react'
import img1 from '../assets/landingpageimg.png'
import './Landingpage.css'
import { TbTruckDelivery } from "react-icons/tb";
import { LuBadgeIndianRupee } from "react-icons/lu";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoIosShirt } from "react-icons/io";
import { TbTruckReturn } from "react-icons/tb";

function Landingpage() {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

  return (
    <>
    <header>
        <div>
            <div id='lpimg'>
                <img src={img1} alt="" />
                <div id='lptxt'>
                    <p id='lptxt1'><span className='lpt1'>Temporary</span> Rentals<br/>Permanent <span className='lpt1'>Smiles</span></p>
                    <p id='lptxt2'>Make <span className='lpt2'>Memories</span>, Not <span className='lpt3'>Purchases</span></p>
                    <p id='lptxt3'>Create <span className='lpt3'>Memories</span> That Last, <span className='lpt2'>Rent</span> Without the <span className='lpt3'>Hassle</span>!</p>
                    <button onClick={() => scrollToSection("hpmensection")} >Explore Collections</button>
                </div>
            </div>
            <div id='lpservice'>
                <ul>
                    <li><div><TbTruckDelivery /></div><p>Pan India Delivery</p></li>
                    <li><div><LuBadgeIndianRupee /></div><p>Cash On Delivery</p></li>
                    <li><div><RiVerifiedBadgeFill /></div><p>Quality Check & Hygiene</p></li>
                    <li><div><IoIosShirt /></div><p>In Store Trial</p></li>
                    <li><div><TbTruckReturn /></div><p>Easy Returns</p></li>
                </ul>
            </div>
        </div>
    </header>
    </>
  )
}

export default Landingpage