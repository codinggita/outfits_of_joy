import React from 'react'
import logo from '../assets/logo.svg';
import { IoMdMail } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("adminToken");
        navigate("/admin/login");
    };
    
    return (
        <header>
            <nav className=' bg-[#bd5850] h-16 flex w-[100%] justify-between px-[2%] items-center text-3xl drop-shadow-[0px_15px_10px_#bd5850] rounded-bl-3xl rounded-br-3xl'>
                <div className='flex items-center gap-3'>
                    <img src={logo} alt="OJ" className='w-12' />
                    <p className='font-joti text-[#D4A242] drop-shadow-[2px_2px_0px_black]'>Outfits of Joy</p>
                </div>

                <div className='flex gap-7'>
                    <div><IoMdMail /></div>
                    <div><IoNotifications /></div>
                    <div onClick={handleLogout}><LuLogOut /></div>
                </div>
            </nav>
        </header>
    )
}
