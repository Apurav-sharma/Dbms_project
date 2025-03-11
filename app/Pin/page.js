"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { FaGooglePay, FaCcVisa, FaWallet, FaUser, FaArrowLeft } from "react-icons/fa";

const Pin = () => {
    const [Pin, setPin] = useState(["", "", "", "", "", ""]);
    const inputsRef = useRef([]);
    const router = useRouter();
    const self = sessionStorage.getItem("self");
    const email = sessionStorage.getItem("email");
    const amount = parseInt(sessionStorage.getItem("amount"));
    const payment_method = sessionStorage.getItem("payment_method");
    const p_name = sessionStorage.getItem("fname");

    useEffect(() => {
        if (!email || !self || !p_name) {
            alert("Don't be clever! 😈");
            router.back();
            return;
        }
    }, [email, router]);
    // console.log("self : " + self);

    const handleChange = (index, e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length <= 1) {
            const newPin = [...Pin];
            newPin[index] = value;
            setPin(newPin);

            if (value && index < Pin.length - 1) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleBackspace = (index, e) => {
        if (e.key === "Backspace" && !Pin[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePayment = async () => {
        try {

            const email = sessionStorage.getItem("email");
            if (!email) {
                router.push("/login");
                return;
            }

            const upi_pin = Pin.join("");
            //    console.log(pin)

            if (self == 1) {
                const self = 1;
                const balance = await axios.post("/api/payment", { email, upi_pin, self });
                sessionStorage.setItem("balance", balance.data[0].balance);
                // console.log(balance.data[0].balance);
                router.push('/paymentsuccess');
                return;
            }

            const payment_method = sessionStorage.getItem("payment_method");
            const amount = parseInt(sessionStorage.getItem("amount"));
            const phone = sessionStorage.getItem("p_phone");

            if (payment_method === "upi") {
                const self = 0;
                try {
                    const res = await axios.post("/api/payment", {
                        email, phone, amount, upi_pin, self, payment_method, self
                    });
                    console.log(res);
                    // router.push('/paymentsuccess');
                    if(res.status === 201) {
                        router.push('/paymentsuccess');
                        return ;
                    }
                } catch (err) {
                    alert(res.message);
                }

            } else if (payment_method === "card") {
                const card_pin = upi_pin;
                const res = await axios.post("/api/payment", {
                    email, phone, amount, card_pin, self, payment_method
                });
                console.log(res);
            } else {
                const res = await axios.post("/api/payment", {
                    email, phone, amount, upi_pin, self, payment_method
                });

                console.log(res);
            }

        } catch (err) {
            alert("Something wrong");
        }
    }

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
                            <p className="text-gray-800 text-lg font-bold">{self == 1 ? "Me" : `${p_name}`}</p>
                        </div>
                    </div>


                    <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                        <FaWallet size={24} className="text-gray-600" />
                        <div>
                            <p className="text-gray-500 text-sm">{self == 1 ? "Checking" : "Sending:"}</p>
                            <p className="text-green-600 text-xl font-semibold">{self == 1 ? "" : `${amount}`}</p>
                        </div>
                    </div>
                </div>


                <h2 className="text-md font-semibold text-gray-700 text-center">Enter Your {payment_method} PIN</h2>
                <p className="text-sm text-gray-500 text-center">Enter the 6-digit PIN to proceed</p>

                <div className="flex justify-center space-x-3 mt-4">
                    {Pin.map((digit, index) => (
                        <input
                            key={index}
                            type="password"
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




                <button onClick={handlePayment} className="mt-6 bg-blue-600 text-white px-5 py-2 w-full rounded-md font-medium shadow-md hover:bg-blue-700 transition duration-200">
                    Verify PIN
                </button>


                {/* <p className="text-xs text-gray-400 text-center mt-4">
                    Forgot PIN? <span className="text-blue-600 font-medium cursor-pointer hover:underline">Reset</span>
                </p> */}
            </div>
        </div>
    );
};

export default Pin;
