import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import { IoMdMail } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <header>
      <nav className="fixed top-0 z-20 bg-[#bd5850] h-16 flex w-full justify-between px-4 md:px-[2%] items-center text-xl md:text-3xl drop-shadow-[0px_10px_10px_#bd5850] rounded-bl-3xl rounded-br-3xl">

        <div className="flex items-center gap-2 md:gap-3">
          <img src={logo} alt="OJ" className="w-8 md:w-12" />
          <p className="font-joti text-[#D4A242] drop-shadow-[2px_2px_0px_black] text-lg md:text-2xl">
            Outfits of Joy
          </p>
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <IoMdClose className="text-3xl" /> 
          ) : (
            <IoMdMenu className="text-3xl" /> 
          )}
        </div>

        <div className="hidden md:flex gap-4 md:gap-7">
          <div className="cursor-pointer hover:text-[#D4A242]">
            <IoMdMail />
          </div>
          <div className="cursor-pointer hover:text-[#D4A242]">
            <IoNotifications />
          </div>
          <div onClick={handleLogout} className="cursor-pointer hover:text-[#D4A242]">
            <LuLogOut />
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-12 right-0  w-16 flex flex-col items-center gap-4 py-4 md:hidden rounded-bl-lg rounded-br-lg shadow-lg">
            <div className="cursor-pointer hover:text-[#D4A242]">
              <IoMdMail />
            </div>
            <div className="cursor-pointer hover:text-[#D4A242]">
              <IoNotifications />
            </div>
            <div onClick={handleLogout} className="cursor-pointer hover:text-[#D4A242]">
              <LuLogOut />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}