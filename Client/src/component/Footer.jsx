import React from 'react'
import './Footer.css'
import img1 from '../assets/footer.png'
import img2 from '../assets/logo2.png'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer>
                <div id='footer'>
                    <img src={img1} alt="" id='footerimg' />
                    <div id='footercontent'>
                        <ul id='footeranchor1'>
                            <li><span href="">Connect with us on</span></li>
                            <li><Link to="help-and-support">Help and support</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/return-and-refund">Return and Refund</Link></li>
                            <li><span href="">Contact Us</span><p>+919898212522</p></li>
                        </ul>
                        <ul id='footeranchor2'>
                            <li id='socialmedia'>
                                <a href="https://www.linkedin.com/in/jadav-parth/"><span><FaSquareInstagram /></span></a>
                                <a href="https://parth-jadav-portfolio.vercel.app/"><span><FaFacebookSquare /></span></a>
                                <a href="https://x.com/Parthjadav_2004"><span><FaSquareXTwitter /></span></a>
                            </li>
                            <li><Link to='/about-us'>About us</Link></li>
                            <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
                            <li><Link to="/hygiene">Hygiene</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <a href=""><p href="">abcd#123@gmail.com</p></a>
                        </ul>
                        <p id='futrdilg'>Build Unforgettable Experiences</p>
                        <div id='creatorcopy'>
                            <p id='copyright'><span><FaRegCopyright /></span>OutfitsOfJoy 2024. All rights reserved.</p>
                            <p id='creator'>Created By:- <a href="https://parth-jadav-portfolio.vercel.app/">JadavParth</a></p>
                        </div>
                        <div id='footerlogo'><img src={img2} alt="" /></div>
                    </div>
                </div>
            </footer>
        </>
    )
}
