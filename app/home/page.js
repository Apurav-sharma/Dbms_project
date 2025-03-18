"use client";
import React, { useState, useEffect } from "react";
import "../component_css/home.css";
import Menubar from "../components/navbar";
import "../component_css/cards.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import CardSlider from "../components/cardslider";
import PaymentMethods from "../components/paymentmethod";

const Home = () => {
    const [user, setuser] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("email");

        if (!user) {
            router.push("/login");
            return;
        }

        const fetch = async () => {
            const res = await axios.get(`/api/users/email/${user}`);
            if (res && res.data) {
                localStorage.setItem("phone", res.data.Phone);
                localStorage.setItem("fname", res.data.FName);
            }
        };

        fetch();
        const fname = localStorage.getItem("fname");

        if (fname) {
            setuser(fname);
        } else {
            setuser(user);
        }
    }, []);

    return (
        <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
            <Menubar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <div className="body2">
                <div className="greetbox">
                    <h1 className="greet">Welcome to FIREBOLT Payment Gateway</h1>
                    <h3 className="greet2">Hello, {user}</h3>
                </div>
            </div>

            <CardSlider />
            <div className="min-h-50 my-10 mx-40 p-4">
                <div
                    className={`p-6 rounded-lg shadow-md cursor-pointer transition ${
                        darkMode ? "bg-gray-800 hover:bg-gray-900 text-white" : "bg-purple-700 hover:bg-purple-800 text-white"
                    }`}
                >
                    <h2 className="text-lg font-semibold">Transfer Money</h2>
                    <p className="text-sm text-gray-300">Send money to mobile, UPI, or bank account.</p>
                    <PaymentMethods />
                </div>
            </div>
        </div>
    );
};

export default Home;
