"use client";
import React from "react";
import { FaCheckCircle, FaArrowLeft, FaUser, FaWallet } from "react-icons/fa";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-4">
            
         
            <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl p-6 w-full max-w-md text-center">
                
              
                <div className="flex justify-center">
                    <FaCheckCircle size={60} className="text-green-500 animate-bounce" />
                </div>

             
                <h2 className="text-xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
                <p className="text-gray-600">Your transaction was completed successfully.</p>

                <div className="bg-gray-100 p-4 rounded-lg shadow-sm mt-6">
                    
                
                    <div className="flex justify-between items-center border-b pb-2">
                        <p className="text-gray-500">Amount Paid:</p>
                        <p className="text-green-600 font-semibold text-lg">150.00 Rs.</p>
                    </div>

                  
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-gray-600" />
                            <p className="text-gray-700 font-medium">From: John Doe</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-gray-600" />
                            <p className="text-gray-700 font-medium">To: Alice Smith</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2">
                            <FaWallet className="text-gray-600" />
                            <p className="text-gray-700 font-medium">Payment Mode: UPI</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => router.push("/")}
                    className="mt-6 bg-blue-600 text-white px-5 py-2 w-full rounded-lg font-medium shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
