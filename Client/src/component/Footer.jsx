import React from 'react'
import './Footer.css'
import img1 from '../assets/footer.png'
import img2 from '../assets/logo2.png'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer>
                <div id='footer'>
                    <img src={img1} alt="" id='footerimg' />
                    <div id='footercontent'>
                        <ul id='footeranchor1'>
                            <li><a href="">Connect with us on</a></li>
                            <li><a href="">Help and support</a></li>
                            <li><a href="">Privacy Policy</a></li>
                            <li><a href="">Return and Refund</a></li>
                            <li><a href="">Contact Us</a><p>+919898212522</p></li>
                        </ul>
                        <ul id='footeranchor2'>
                            <li id='socialmedia'><a href="">
                                <span><FaSquareInstagram /></span>
                                <span><FaFacebookSquare /></span>
                                <span><FaSquareXTwitter /></span>
                            </a></li>
                            <li><a href="">About us</a></li>
                            <li><a href="">Terms and Conditions</a></li>
                            <li><a href="">Hygiene</a></li>
                            <li><a href="">FAQs</a></li>
                            <a href=""><p href="">abcd#123@gmail.com</p></a>
                        </ul>
                        <p id='futrdilg'>Build Unforgettable Experiences</p>
                        <p id='copyright'><span><FaRegCopyright /></span>OutfitsOfJoy 2024. All rights reserved.</p>
                        <div id='footerlogo'><img src={img2} alt="" /></div>
                    </div>
                </div>
            </footer>
        </>
    )
}
