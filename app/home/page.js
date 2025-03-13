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
<<<<<<< HEAD
    const [user, setuser] = useState("Apurav");
    const [darkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };
=======
    const [user, setuser] = useState("");
>>>>>>> 929f58eb7572177136231e82d730f97524ee930f
    const router = useRouter();

    // useEffect(() => {
    //     const user = sessionStorage.getItem("email");

<<<<<<< HEAD
    //     if (!user) {
    //         router.push("/login");
    //     }
    //     const fetch = async () => {
    //         const res = await axios.get(`/api/users/${user}`)
    //         if (res && res.data) {
    //             sessionStorage.setItem("phone", res.data.phone);
    //             sessionStorage.setItem("fname", res.data.fname);
    //         }
    //     }
=======
        // if (!user) {
        //     router.push("/login");
        // }
        const fetch = async () => {
            const res = await axios.get(`/api/users/${user}`);
            if (res && res.data) {
                sessionStorage.setItem("phone", res.data.phone);
                sessionStorage.setItem("fname", res.data.fname);
            }
        }
>>>>>>> 929f58eb7572177136231e82d730f97524ee930f

    //     fetch();
    //     const fname = sessionStorage.getItem("fname");

    //     if (fname) {
    //         setuser(fname);
    //     } else {
    //         setuser(user);
    //     }
    // }, []);

    const checkBalance = async () => {
        const email = sessionStorage.getItem("email");
        if (!email) {
            router.push("/login");
        }

        sessionStorage.setItem("self", 1);
        router.push("/pin");

        // const balance = await axios.post('/api/payment', {email});

        // console.log(balance);
    }

    const MakePayment = () => {
        sessionStorage.setItem("self", 0);
        router.push("/contact");
    }
    
    return (
        <div className="body">
            <Menubar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
            <div className="body2">
                <div className="greetbox">
                    <h1 className="greet">Welcome to FIREBOLT Payment Gateway</h1>
                    <h3 className="greet2">Hello, {user}</h3>
                </div>
            </div>

            <CardSlider />
            <div className="min-h-50 m-10 text-white p-4">
            <div
                className="bg-purple-700 p-6 rounded-lg shadow-md cursor-pointer hover:bg-purple-800 transition"
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