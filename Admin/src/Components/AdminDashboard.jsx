import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import admin from '../assets/bajrangbali.jpg';
import Dashboard from './Dashboard';
import OutfitsUpdate from './OutfitsUpdate';
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('adminToken');

      if (!token) {
        navigate('/admin/login'); 
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setData(response.data);
          console.log(response.data.user.name);
        } else {
          setError('Access denied');
        }
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="m-[2%] flex flex-col md:flex-row ">
        <div
          className="static md:fixed top-24 w-full md:w-[30%] lg:w-[20%] h-auto md:h-[80vh] border-2 border-[#D4A242] rounded-[20px] p-4 grid gap-2 justify-center text-center items-center font-bree text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] pb-[30px]"
          style={{
            background: 'linear-gradient(45deg, rgba(212,162,66,0.5), rgba(255,99,7,0.5))',
            backgroundSize: 'cover',
          }}
        >
          <h4 className="text-[#D4A242] drop-shadow-[1px_1px_0px_black]">Admin</h4>

          <img
            src={admin}
            alt="Admin"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 rounded-full justify-self-center"
          />

          <h3 className="font-joti bg-[rgba(199,81,70,0.5)] p-2 rounded-full mb-[20px]">
            Parth Jadav
          </h3>

          <h4 className="bg-[rgba(199,81,70,0.5)] p-2 rounded-full text-white cursor-pointer hover:bg-[rgba(199,81,70,0.8)]">
            <Link to="/admin/dashboard">Dashboard</Link>
          </h4>
          <h4 className="bg-[rgba(199,81,70,0.5)] p-2 rounded-full text-white cursor-pointer hover:bg-[rgba(199,81,70,0.8)]">
            <Link to="/admin/dashboard/users">Update Outfits</Link>
          </h4>
          <h4 className="bg-[rgba(199,81,70,0.5)] p-2 rounded-full text-white cursor-pointer hover:bg-[rgba(199,81,70,0.8)]">
            <Link to="/admin/dashboard/orders">View Orders</Link>
          </h4>
        </div>

        <div className="w-full md:ml-[30%] lg:ml-[21%] p-4 mt-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<OutfitsUpdate />} />
            {/* <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;