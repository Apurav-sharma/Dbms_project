"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaBell, FaMoneyBill, FaMoon, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";

const SettingsPage = () => {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [url, seturl] = useState(null);
    const email = localStorage.getItem('email');
    const fname = localStorage.getItem('fname');

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
        return;
    }

    const handleedit = () => {
        router.push('/edit');
        return;
    }

    useEffect(() => {

        if (!email) {
            router.push('/login');
            return;
        } else if (!fname) {
            router.push('/form');
            return;
        }

        const fetch = async () => {
            const response = await axios.get(`/api/users/email/${email}`);
            seturl(response.data.image);
        }

        fetch();

    }, []);


    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>

            <div className={`w-full max-w-md p-6 rounded-xl shadow-xl ${darkMode ? "bg-gray-800" : "bg-white/90 backdrop-blur-lg"}`}>

                <div className="flex items-center mb-6">
                    <button onClick={() => router.push("/settings")} className="text-gray-600 hover:text-gray-900 transition mr-3">
                        <FaArrowLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold flex-1 text-center">Settings</h2>
                </div>


                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                        {url ? <img src={url} alt="image"/> : fname.charAt(0).toUpperCase()}
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{fname}</h3>
                    <p className="text-gray-500 text-sm">{email}</p>
                </div>

                <div className="space-y-4">


                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
                        <div className="flex items-center space-x-3">
                            <FaUser className="text-gray-600" />
                            <p className="font-medium">Account</p>
                        </div>
                        <button className="text-blue-500 hover:underline" onClick={handleedit}>Edit</button>
                    </div>


                    {/* <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
                        <div className="flex items-center space-x-3">
                            <FaLock className="text-gray-600" />
                            <p className="font-medium">Security</p>
                        </div>
                        <button className="text-blue-500 hover:underline">Manage</button>
                    </div> */}

                    {/* <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
                        <div className="flex items-center space-x-3">
                            <FaMoneyBill className="text-gray-600" />
                            <p className="font-medium">Payment</p>
                        </div>
                        <button className="text-blue-500 hover:underline">Update</button>
                    </div> */}


                    {/* <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
                        <div className="flex items-center space-x-3">
                            <FaBell className="text-gray-600" />
                            <p className="font-medium">Notifications</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={notifications}
                                onChange={() => setNotifications(!notifications)}
                            />
                            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${notifications ? "bg-green-500" : "bg-gray-400"}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications ? "translate-x-5" : "translate-x-0"}`}></div>
                            </div>
                        </label>
                    </div> */}


                    {/* <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
                        <div className="flex items-center space-x-3">
                            <FaMoon className="text-gray-600" />
                            <p className="font-medium">Dark Mode</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${darkMode ? "bg-green-500" : "bg-gray-400"}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${darkMode ? "translate-x-5" : "translate-x-0"}`}></div>
                            </div>
                        </label>
                    </div> */}
                </div>


                <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-5 py-2 w-full rounded-lg font-medium shadow-md hover:bg-red-600 transition duration-200">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
