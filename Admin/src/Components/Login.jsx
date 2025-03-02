import React, { useState } from 'react';
import image1 from '../assets/blue.png';
import logo from '../assets/logo.svg';
import axios from "axios";
import { FaUser, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://outfits-of-joy.onrender.com/admin/login", {
                email,
                password,
            });

            if (response.data.success) {
                // Store JWT token in sessionStorage
                sessionStorage.setItem("adminToken", response.data.token);
                window.location.href = "/admin/dashboard"; // Redirect to dashboard
                toast.success("Login successfully!");
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Login failed. Please try again.");
            toast.error("Invalid credentials");
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen"
            style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="bg-[rgba(255,255,255,0.3)] p-8 rounded-2xl shadow-lg border-2 border-blue-300 w-80 text-center">
                <div className="flex justify-center">
                    <img src={logo} alt="" className='w-20 h-20 rounded-full' />
                </div>
                <h2 className="text-xl mt-2 font-joti">Admin Panel</h2>

                {/* Username Input */}
                <div className="flex items-center border-b border-gray-400 mt-4 px-2 font-bree">
                    <FaUser className="text-gray-500" />
                    <input
                        type="email"
                        placeholder="Admin"
                        className="outline-none ml-2 w-full p-1 bg-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="flex items-center border-b border-gray-400 mt-4 px-2">
                    <FaKey className="text-gray-500" />
                    <input
                        type="password"
                        placeholder="********"
                        className="outline-none ml-2 w-full p-1 bg-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Login Button */}
                <button onClick={handleLogin} className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-full mt-6 font-bree">
                    Log In
                </button>
            </div>
        </div>
    );
}

export default Login;
