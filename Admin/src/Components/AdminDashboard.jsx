import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setData(response.data);
          console.log(response.data.user.name);
        } else {
          setError("Access denied");
        }
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div>
          
        </div>
        {/* <compoennt /> */}
        {/* <compoennt /> */}
        {/* <compoennt /> */}
      </div>
    </>
  );
};

export default AdminDashboard;