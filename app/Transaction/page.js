"use client";
import React, { useState } from "react";
import { FaGooglePay, FaCcVisa, FaWallet, FaUser, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const transaction = () => {
    const [amount, setAmount] = useState("");
    const router = useRouter();
    const [payment_method, setmethod] = useState('upi');

    const email = sessionStorage.getItem("email");
    if (!email) {
        router.push("/login");
    }

    const p_name = sessionStorage.getItem("p_name");
    const p_number = sessionStorage.getItem("p_phone");

    if (!p_name || !p_number) {

        router.push("/contact");
    }

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        setAmount(value >= 0 ? value : "");
    };

    const moveback = () => {
        router.back();
    };

    const handlePay = async () => {
        try {

            sessionStorage.setItem("payment_method", payment_method);
            sessionStorage.setItem("amount", amount);
            sessionStorage.setItem("self", 0);

            router.push("/pin");

        } catch (err) {
            console.error(err);
            alert("Payment failed. Please try again.");
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-300 p-6">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
                <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md mb-6">

                    <button className="text-gray-600 hover:text-gray-900 transition mr-3" onClick={moveback}>
                        <FaArrowLeft size={24} />
                    </button>

                    <div className="flex items-center space-x-3">
                        <FaUser className="text-gray-600" size={26} />
                        <p className="text-gray-700 text-lg font-semibold">{p_number}</p>
                    </div>

                    <div className="flex-1 text-center text-gray-800 text-xl font-bold">
                        {p_name}
                    </div>
                </div>

                <h2 className="text-lg font-medium text-gray-700 text-center mb-4">Enter Amount</h2>
                <div className="relative flex items-center border rounded-lg p-3 shadow-md bg-gray-50">
                    <button
                        onClick={() => setAmount(Math.max(0, amount - 1))}
                        className="p-3 bg-gray-300 rounded-l-md hover:bg-gray-400 transition"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={handleInputChange}
                        className="w-full text-center text-lg text-gray-800 font-semibold border-none outline-none bg-transparent"
                    />
                    <button
                        onClick={() => setAmount(amount + 1)}
                        className="p-3 bg-gray-300 rounded-r-md hover:bg-gray-400 transition"
                    >
                        +
                    </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mt-6 text-center">Choose Payment Method</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button onClick={() => setmethod('upi')} className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
                        <FaGooglePay className="mr-2" size={22} /> UPI
                    </button>
                    <button onClick={() => setmethod('card')} className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-purple-700 transition">
                        <FaCcVisa className="mr-2" size={22} /> Card
                    </button>
                    <button onClick={() => setmethod('wallet')} className="flex items-center justify-center py-3 px-4 bg-yellow-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-yellow-600 transition">
                        <FaWallet className="mr-2" size={22} /> Wallet
                    </button>
                </div>
                <button onClick={handlePay} className="mt-6  bg-red-500 text-white px-5 py-2 w-full rounded-lg font-medium shadow-md hover:bg-red-600 transition duration-200">
                    Pay
                </button>

            </div>

        </div>
    );
};

export default transaction;
