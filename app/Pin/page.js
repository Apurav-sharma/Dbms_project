"use client";
import React, { useState, useRef } from "react";
import {  FaWallet, FaUser, FaArrowLeft } from "react-icons/fa";

const pin = () => {
    const [pin, setpin] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);

    const handleChange = (index, e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length <= 1) {
            const newpin = [...pin];
            newpin[index] = value;
            setpin(newpin);

            if (value && index < pin.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (index, e) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
            
            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md">
                
             
                <div className="flex items-center space-x-3 mb-6">
                    <button className="text-gray-600 hover:text-gray-900 transition">
                        <FaArrowLeft size={24} />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-700">Confirm Payment</h2>
                </div>

               
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
              
                    <div className="flex items-center space-x-2">
                        <FaUser size={24} className="text-gray-600" />
                        <div>
                            <p className="text-gray-500 text-sm">To:</p>
                            <p className="text-gray-800 text-lg font-bold">John Doe</p>
                        </div>
                    </div>

                   
                    <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                        <FaWallet size={24} className="text-gray-600" />
                        <div>
                            <p className="text-gray-500 text-sm">Sending:</p>
                            <p className="text-green-600 text-xl font-semibold">150.00 Rs.</p>
                        </div>
                    </div>
                </div>

                
                <h2 className="text-md font-semibold text-gray-700 text-center">Enter Your UPI pin</h2>
                <p className="text-sm text-gray-500 text-center">Enter the 6-digit pin to proceed</p>

                <div className="flex justify-center space-x-3 mt-4">
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            ref={(el) => (inputsRef.current[index] = el)}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleBackspace(index, e)}
                            className="w-12 h-12 bg-white text-gray-800 text-center text-xl font-semibold border border-gray-300 rounded-md shadow-md outline-none transition-all duration-200 ease-in-out
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:scale-110 hover:border-gray-400"
                        />
                    ))}
                </div>

               

             
                <button className="mt-6 bg-blue-600 text-white px-5 py-2 w-full rounded-md font-medium shadow-md hover:bg-blue-700 transition duration-200">
                    Verify pin
                </button>

               
                {/* <p className="text-xs text-gray-400 text-center mt-4">
                    Forgot pin? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Reset</span>
                </p> */}
            </div>
        </div>
    );
};

export default pin;
